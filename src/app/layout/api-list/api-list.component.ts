import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ImgService } from '../../services/upimg.service';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  public showlist = false;
  public apilist = [];
  showtext = false;
  text = '';
  calssn = 'orderbottom';
  showinfo = false;
  next = true;
  showupdate = false;
  showadd = false;
  pagesize = 10;
  order = 'asc';
  orderBy = 'id';
  totalList = [];
  category;
  anapiname;
  namelist = [];
  page = 1;
  apiInfo = {apiname: '', image: '', isShow: '0'};
  image = '';
  count = 1;
  num;
  constructor(public http: ApiService, public upimg: ImgService) { }

  ngOnInit() {
    this.getapilist();
  }
  setorderby() {
    if (this.next) {
      if (this.calssn === 'orderbottom') {
        this.calssn = 'ordertop';
        this.order = 'desc';
      } else {
        this.calssn = 'orderbottom';
        this.order = 'asc';
      }
      this.next = false;
      this.getapilist();
    }
  }
  search() {
    if (this.anapiname) {
      this.http.getAnApi(this.page, this.pagesize, this.order, this.orderBy, this.anapiname)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.apilist = res.result;
          if (res.result.length > 7) {
            this.totalList = [];
            const num = Math.ceil(res.result.length / this.pagesize);
            for (let i = 1 ; i <= num ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'active'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
          } else {
            this.totalList = [];
          }
        } else {
          this.text = '没有相关ＡＰＩ!';
          this.showtext = true;
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        }
      });
    } else {
      this.getapilist();
    }
  }
  updateApi(item) {
    this.showinfo = true;
    this.showupdate = true;
    this.apiInfo = JSON.parse(JSON.stringify(item));
  }
  updateaApi(item, num) {
    this.apiInfo = JSON.parse(JSON.stringify(item));
    this.apiInfo.isShow = num;
    this.updateApis();
  }
  updateApis () {
    if (this.image) {
      this.apiInfo.image = this.image;
    } else if (this.apiInfo.image === 'assets/images/API_icon.png') {
      this.apiInfo.image = '';
    }
    this.http.updatedApi(this.apiInfo)
    .subscribe((res: any) => {
      if (res.status === 'ok') {
        this.text = '修改ＡＰＩ成功!';
        this.apiInfo = {apiname: '', image: '', isShow: ''};
        this.getapilist();
        this.showtext = true;
        this.showinfo = false;
        this.showupdate = false;
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      } else {
        this.text = '修改ＡＰＩ失败!';
        this.showtext = true;
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      }
    });
  }
  delApi(item) {
    if (confirm(`确定要删除'${item.apiname}'吗？`)) {
      this.http.deleteApi(item.id)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.text = '删除ＡＰＩ成功!';
          this.getapilist();
          this.showtext = true;
          this.showinfo = false;
          this.showadd = false;
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        } else {
          this.text = '删除ＡＰＩ失败!';
          this.showtext = true;
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        }
      });
    }
  }
  addApi() {
    this.showinfo = true;
    this.showadd = true;
    this.apiInfo = {apiname: '', image: '', isShow: '0'};
  }
  addApis() {
    if (this.apiInfo.apiname) {
      this.apiInfo.image = this.image;
      this.http.addApi(this.apiInfo)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.text = '添加ＡＰＩ成功!';
          this.apiInfo = {apiname: '', image: '', isShow: ''};
          this.getapilist();
          this.showtext = true;
          this.showinfo = false;
          this.showadd = false;
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        } else {
          this.text = '添加ＡＰＩ失败!';
          this.showtext = true;
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        }
      });
    } else {
      this.text = '请输入ＡＰＩ名称!';
      this.showtext = true;
      setTimeout(() => {
        this.showtext = false;
        this.text = '';
      }, 1000);
    }
  }
  upimage(e) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.upimg.updatedImg(formData)
      .subscribe((data: any) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          this.image = `https://${this.leap}/images/${data.result}`;
        } else {
          this.text = '上传图片失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  setorder(e) {
    if (e.target.value) {
      if (Number(e.target.value)) {
        this.category = '';
        this.pagesize = Number(e.target.value);
        this.totalList = [];
        this.getapilist();
      } else {
        this.pagesize = 10;
        this.category = e.target.value;
        this.totalList = [];
        this.getapilist();
      }
    }
  }
  apiindex(e) {
    if (e.target.nodeName === 'LI' && this.next) {
      this.next = false;
      if (this.page === this.num && e.target.innerHTML === '»') {
        this.getapilist();
        return;
      } else if (e.target.innerHTML === '«') {
        const li = document.getElementsByClassName('actives')[0];
        const firstnum = Number(document.getElementsByClassName('page')[0].children[1].innerHTML);
        const lastnum = Number(document.getElementsByClassName('page')[0].children[document.getElementsByClassName('page')[0].children.length - 2].innerHTML);
        if (firstnum === Number(li.innerHTML) && lastnum > 10) {
          li.className = '';
          this.page = Number(li.innerHTML) - 1;
          this.totalList.unshift({num: this.page, stylename: 'actives'});
          this.totalList.pop();
        } else if (this.page > 1) {
          li.className = '';
          this.page = Number(li.innerHTML) - 1;
          li.previousElementSibling.className = 'actives';
        }
      } else if (e.target.innerHTML === '»') {
        const li = document.getElementsByClassName('actives')[0];
        const lastnum = Number(document.getElementsByClassName('page')[0].children[document.getElementsByClassName('page')[0].children.length - 2].innerHTML);
        if (this.page < 10) {
          li.className = '';
          this.page = Number(li.innerHTML) + 1;
          li.nextElementSibling.className = 'actives';
        } else if (this.page < this.num && this.page === lastnum) {
          li.className = '';
          this.page = this.page + 1;
          this.totalList.shift();
          this.totalList.push({num: this.page, stylename: 'actives'});
        } else {
          li.className = '';
          this.page = Number(li.innerHTML) + 1;
          li.nextElementSibling.className = 'actives';
        }
      } else {
        const lis = document.getElementsByClassName('page')[0].children;
        for (let i = 1 ; i < lis.length - 1 ; i++) {
          lis[i].className = '';
        }
        e.target.className = 'actives';
        this.page = Number(e.target.innerHTML);
      }
      this.getapilist();
      const liss = document.getElementsByClassName('page')[0].children;
      if (this.page !== 1) {
        liss[0].className = 'prev';
      } else {
        liss[0].className = 'prev prevv';
      }
      if (this.page !== this.num) {
        liss[liss.length - 1].className = 'next';
      } else {
        liss[liss.length - 1].className = 'next prevv';
      }
    }
  }
  getapilist() {
    this.http.getApiList(this.page, this.pagesize, this.orderBy, this.order)
    .subscribe((res: any) => {
      if (res.status === 'ok') {
        this.next = true;
        res.result.api.filter(item => {
          if (!item.image) {
            item.image = 'assets/images/API_icon.png';
          }
        });
        this.http.getApiList(this.page, this.pagesize, this.orderBy, this.order)
        .subscribe((data: any) => {
          if (data.status === 'ok') {
            data.result.api.filter(item => {
              if (this.namelist.indexOf(item.category) < 0) {
                this.namelist.push(item.category);
              }
            });
          }
        });
        this.apilist = res.result.api;
        if (res.result.count > this.count) {
          this.count = res.result.count;
        }
        const num = Math.ceil(res.result.count / this.pagesize);
        this.num = num;
        if (!this.totalList.length) {
          if (num >= 10) {
           for (let i = 1 ; i <= 10 ; i++) {
             if (i === 1) {
               this.totalList.push({num: i, stylename: 'actives'});
             } else {
               this.totalList.push({num: i, stylename: ''});
             }
           }
          } else {
           for (let i = 1 ; i <= num ; i++) {
             if (i === 1) {
               this.totalList.push({num: i, stylename: 'actives'});
             } else {
               this.totalList.push({num: i, stylename: ''});
             }
           }
          }
       }
        this.showlist = true;
      }
      this.next = true;
    });
  }
  toExcel(table, e) {
    const html = '<html><head><meta charset="utf-8" /></head><body>' +
     document.getElementById(table).outerHTML +
      '</body></html>';
      // console.log(html);
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        e.target.href = URL.createObjectURL(blob);
        e.target.download = 'app信息表.xls';
  }
}
