import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserListService } from './user-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [routerTransition()]
})
export class UserListComponent implements OnInit {
  showlist = false;
  public finduser = '';
  public userlist = [];
  public show = true;
  public showadd = false;
  classn = 'orderbottom';
  public src = '';
  public showimg = false;
  public showappimg = false;
  public pageSize = 10;
  public pagesizes = 1;
  num;
  showtext = false;
  text = '';
  public appList = [];
  public App = {image: ''};
  public totalPages = [];
  public next = true;
  public noApp = true;
  public apptotalPages = [];
  public apppagesizes = 1;
  public apppageSize = 8;
  public appid;
  public counts;
  public appname;
  public nextpage = true;
  public tips = '';
  public tip = '';
  public tis = '';
  public modify = false;
  public userinfo;
  public uspic;
  public anuser = [];
  public mApp = false;
  showuser = false;
  nums;
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  order = 'asc';
  url;
  orderBy = 'createTime';
  public adduser = {
    username: '',
    password: '',
    mobile: '',
    fullname: '',
    email: '',
    extend: {IDcard: '', company: '', job: ''}
  };
  constructor(private http: UserListService, public router: Router) {
  }

  ngOnInit() {
   this.getlist(1);
  }
  setorderby() {
    if (this.next) {
      this.next = false;
      if (this.classn === 'orderbottom') {
        this.classn = 'ordertop';
        this.order = 'desc';
      } else {
        this.classn = 'orderbottom';
        this.order = 'asc';
      }
      if (this.appid) {
        this.getApp(this.appid, this.appname, 1);
      } else {
        this.getlist(1);
      }
    }
  }
  setpagesize(num) {
    this.pageSize = num;
    this.getlist(1);
  }
  showmodel(con) {
    this.modify = true;
    this.userinfo = JSON.parse(JSON.stringify(con));
  }
  upuserinfo() {
      if (this.userinfo.extend.companyLicensePic === 'assets/images/deful.jpg') {
        this.userinfo.extend.companyLicensePic = '';
      }
      if (this.userinfo.extend.personalIdPic[0].url === 'assets/images/deful.jpg') {
        this.userinfo.extend.personalIdPic[0].url = '';
      }
      if (this.userinfo.extend.personalIdPic[1].url === 'assets/images/deful.jpg') {
        this.userinfo.extend.personalIdPic[1].url = '';
      }
      this.userinfo.extend = JSON.stringify(this.userinfo.extend);
      this.http.updateUser(this.userinfo)
        .subscribe((data) => {
          if (data.status === 'ok') {
            this.tis = '修改用户信息成功!';
            this.getlist(sessionStorage.getItem('page'));
            this.userinfo.extend = JSON.parse(this.userinfo.extend);
            setTimeout(() => {
              this.modify = false;
              this.showimg = false;
              this.tis = '';
              this.src = '';
            }, 1400);
          } else {
            this.userinfo.extend = JSON.parse(this.userinfo.extend);
            this.tis = '修改用户信息失败!';
          }
        }, error => {
          if (error) {
            this.tis = '修改用户信息失败!';
            this.userinfo.extend = JSON.parse(this.userinfo.extend);
            setTimeout(() => {
              this.tis = '';
            }, 1000);
          }
        });
  }
  delapp(id, appname) {
    if (confirm(`确定要删除${appname}这个app吗？`)) {
      this.http.delApp(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.show = true;
          this.appindex(sessionStorage.getItem('text'));
        }
      });
    }
  }
  addnewuser() {
    const newuser = JSON.parse(JSON.stringify(this.adduser));
    newuser.extend = JSON.stringify(newuser.extend);
    if (this.adduser.username && this.adduser.password && this.adduser.mobile && this.adduser.email) {
      this.http.addUser(newuser)
    .subscribe((res) => {
      if (res.status === 'ok') {
        this.tips = '添加新用户成功！';
        this.totalPages = [];
        this.getlist(sessionStorage.getItem('page'));
      } else {
        this.tips = '添加新用户失败！';
      }
    });
    } else {
      this.tips = '请填写星号必填字段！';
    }
    setTimeout(() => {
      if (this.tips === '添加新用户成功！') {
        this.showadd = false;
      }
      this.tips = '';
    }, 2000);
  }
  deluser(id, uname) {
    if (confirm(`你确定要删除${uname}用户吗？`)) {
      this.http.delUser({'id': id, 'username': uname})
      .subscribe((res) => {
        if (res.status === 'ok') {
          this.tip = '删除用户成功！';
          this.totalPages = [];
          this.getlist(1);
        } else {
          this.tip = '删除用户失败！';
        }
      });
      setTimeout(() => {
        this.tip = '';
      }, 2000);
    }
  }
  index(index) {
    if (this.next && index.target.nodeName === 'LI') {
      this.next = false;
      if (index.target.innerHTML === '«') {
        const page = Number(sessionStorage.getItem('page'));
        const newpage = page - 1;
        if (page === 1) {
          this.nums = 1;
          this.next = true;
          return;
        } else if (this.totalPages[this.totalPages.length - 1].num > this.totalPages.length) {
          sessionStorage.setItem('page', `${newpage}`);
          this.nums = page - 1;
          this.getlist(page - 1);
          this.totalPages.unshift({num: this.totalPages[0].num - 1, stylename: ''});
          this.totalPages = this.totalPages.slice(0, this.totalPages.length - 1);
        } else if (page > 1) {
          sessionStorage.setItem('page', `${newpage}`);
          this.nums = page - 1;
          this.getlist(page - 1);
        }
        for (let h = 0 ; h < this.totalPages.length ; h++) {
            this.totalPages[h].stylename = '';
            this.totalPages[h].index = h;
            if (this.totalPages[h].num === page - 1) {
              this.totalPages[h].stylename = 'active';
            }
        }
      } else if (index.target.innerHTML === '»') {
        const page = Number(sessionStorage.getItem('page'));
        if (page === Number(sessionStorage.getItem('totalpage'))) {
          this.nums = page;
          this.next = true;
          return;
        } if (page < this.totalPages[this.totalPages.length - 1].num) {
          for (let h = 0 ; h < this.totalPages.length ; h++) {
              this.totalPages[h].stylename = '';
              this.totalPages[h].index = h;
              if (this.totalPages[h].num === page + 1) {
                this.totalPages[h].stylename = 'active';
              }
          }
          const newpage = page + 1;
          sessionStorage.setItem('page', `${newpage}`);
          this.nums = page + 1;
          this.getlist(page + 1);
        } else if (page < Number(sessionStorage.getItem('totalpage'))) {
          const newpage = page + 1;
          sessionStorage.setItem('page', `${newpage}`);
          this.totalPages.push({num: page + 1, stylename: ''});
          this.totalPages = this.totalPages.slice(1, this.totalPages.length);
          for (let h = 0 ; h < this.totalPages.length ; h++) {
              this.totalPages[h].stylename = '';
              this.totalPages[h].index = h;
              if (this.totalPages[h].num === page + 1) {
                this.totalPages[h].stylename = 'active';
              }
          }
          this.nums = page + 1;
          this.getlist(page + 1);
        }
      } else {
        for (let h = 0 ; h < this.totalPages.length ; h++) {
          this.totalPages[h].index = h;
          this.totalPages[h].stylename = '';
        }
        this.totalPages[index.target.id].stylename = 'active';
        this.nums = Number(index.target.id) + 1;
        this.getlist(this.nums);
        sessionStorage.setItem('page', index.target.innerHTML);
      }
      const liss = document.getElementsByClassName('page')[0].children;
      if (this.nums !== 1) {
        liss[0].className = 'prev';
      } else {
        liss[0].className = 'prev prevv';
      }
      if (this.nums !== this.num) {
        liss[liss.length - 1].className = 'next';
      } else {
        liss[liss.length - 1].className = 'next prevv';
      }
    }
  }
  appindex(index) {
    for (let h = 1 ; h <= this.apptotalPages.length ; h++) {
      if (index === `${h}`) {
        this.show = !this.show;
        this.getApp(this.appid, this.appname, Number(index));
      }
    }
  }
  setorder(oname) {
    if (this.next) {
      this.next = false;
      this.orderBy = oname;
      if (this.appid) {
        this.getApp(this.appid, this.appname, 1);
      } else {
        this.getlist(1);
      }
    }
  }
  getlist(page) {
    if (this.finduser) {
      this.url = '/v2/userforadmin/queryuserlimitpage';
      this.totalPages = [];
      this.orderBy = 'id';
    } else {
      this.url = '/v2/userforadmin/queryuserpage';
    }
    sessionStorage.setItem('page', page);
    this.http.getList(this.url, {'mobile': this.finduser, 'page': page, 'pagesize': this.pageSize, 'order': this.orderBy, 'orderby': this.order})
    .subscribe((data) => {
      if (data.status === 'ok') {
        this.counts = data.result.count;
        const pages = Math.ceil(data.result.count / this.pageSize);
        this.num = pages;
        sessionStorage.setItem('totalpage', `${pages}`);
        if (this.pagesizes !== this.pageSize) {
          this.pagesizes = this.pageSize;
          this.totalPages = [];
          for (let j = 1 ; j <= pages ; j++) {
            if ( j === 1) {
              this.totalPages.push({num: j, stylename: 'active', index: j - 1});
            } else if (this.totalPages.length < 10) {
              this.totalPages.push({num: j, stylename: '', index: j - 1});
            }
          }
        } else {
          if (!this.totalPages.length) {
            for (let j = 1 ; j <= pages ; j++) {
              if ( j === 1) {
                this.totalPages.push({num: j, stylename: 'active', index: j - 1});
              } else if (this.totalPages.length < 10) {
                this.totalPages.push({num: j, stylename: '', index: j - 1});
              }
            }
          }
        }
        data.result.user.filter((item, index) => {
          item.extend = item.extend ? JSON.parse(item.extend) : {};
          if (!item.extend.personalIdPic || item.extend.personalIdPic.length === 0) {
            item.extend.personalIdPic = [{'url': 'assets/images/deful.jpg'}, {'url': 'assets/images/deful.jpg'}];
          }
          if (item.extend.personalIdPic.length === 1) {
            item.extend.personalIdPic.push({'url': 'assets/images/deful.jpg'});
          }
          if (!item.extend.personalIdPic[0].url) {
            item.extend.personalIdPic[0].url = 'assets/images/deful.jpg';
          }
          if (!item.extend.personalIdPic[1].url) {
            item.extend.personalIdPic[1].url = 'assets/images/deful.jpg';
          }
          if (!item.extend.companyLicensePic) {
            item.extend.companyLicensePic = 'assets/images/deful.jpg';
          }
        });
        this.userlist = data.result.user;
        this.showlist = true;
      }
      this.next = true;
    });
  }
  bigPic(url, num, con) {
    this.src = url;
    this.uspic = num;
    this.showimg = true;
    this.userinfo = JSON.parse(JSON.stringify(con));
  }
  appPic(con) {
    this.showappimg = true;
    this.src = con.image;
    this.App = JSON.parse(JSON.stringify(con));
  }
  upapppic() {
    if (this.src !== 'assets/images/deful.jpg') {
      this.App.image = this.src;
      this.upappinfo();
    } else {
      this.App.image = '';
      this.upappinfo();
    }
  }
  updataImg(e) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.http.updateImg(formData)
      .subscribe((data) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功！';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          this.src = data.result;
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
  updataImgs(e) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.http.updateAppImg(formData)
      .subscribe((data) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          this.src = `https://${this.leap}/images/${data.result}`;
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
  upuserpic() {
    if (this.uspic === 1) {
      this.userinfo.extend.companyLicensePic = this.src;
    } else if (this.uspic === 2) {
      this.userinfo.extend.personalIdPic[0].url = this.src;
    } else {
      this.userinfo.extend.personalIdPic[1].url = this.src;
    }
    this.upuserinfo();
  }
  upappinfo() {
    const appinfo = JSON.parse(JSON.stringify(this.App));
    if (appinfo.image && appinfo.image !== 'assets/images/deful.jpg') {
      appinfo.image = appinfo.image.split('/')[appinfo.image.split('/').length - 1];
    } else {
      appinfo.image = '';
    }
    this.http.updateApp(appinfo)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.tis = '修改APP信息成功!';
          this.appindex(sessionStorage.getItem('text'));
          setTimeout(() => {
            this.tis = '';
            this.mApp = false;
            this.showappimg = false;
            this.src = '';
          }, 1000);
        } else {
            this.tis = '修改APP信息失败!';
            setTimeout(() => {
              this.tis = '';
            }, 1000);
        }
      });
  }
  getApp(id, username, text) {
    sessionStorage.setItem('text', text);
    this.appid = id;
    this.appname = username;
    this.show = false;
    if (this.nextpage) {
      this.nextpage = false;
      this.apptotalPages = [];
      this.appList = [];
      this.http.getAppList(id, {'order': this.order, 'orderBy': this.orderBy, 'pageNum': text, 'pageSize': this.apppageSize })
      .subscribe(data => {
        if (data.status === 'ok') {
          this.apppagesizes = Math.ceil(data.result.count / this.apppageSize);
          if (text === 1) {
            this.apptotalPages = [{num: 1, stylename: 'active', index: 0}];
            for (let j = 2 ; j <= this.apppagesizes ; j++) {
              this.apptotalPages.push({num: j, stylename: '', index: j - 1});
            }
          } else {
            for (let j = 1 ; j <= this.apppagesizes ; j++) {
              if (j === text) {
                this.apptotalPages.push({num: j, stylename: 'active', index: j - 1});
              } else {
                this.apptotalPages.push({num: j, stylename: '', index: j - 1});
              }
            }
          }
          data.result.appList.filter(item => {
            if (item.image && item.image.indexOf('www') === -1) {
              item.image = item.image.length > 5 ? `https://${this.leap}/images/${item.image}` : 'assets/images/deful.jpg';
            }
            if (item.image === null || item.image.length < 4) {
              item.image = 'assets/images/deful.jpg';
            }
          });
          this.appList = data.result.appList;
        } else {
          this.apppagesizes = 1;
        }
        this.next = true;
        this.nextpage = true;
      });
    }
  }
  toExcel(table, e) {
    let content = document.getElementById(table).outerHTML.replace('应用', '').replace('操作', '').replace('身份证照', '').replace('企业营业执照', '');
    let contents = document.getElementById(table).outerHTML.replace('licensePic', '').replace('personPic', '').replace('app', '').replace('operate', '');
    for (let i = 0; i < this.counts; i++) {
      if (content.indexOf('删除') > -1 || content.indexOf('delete') > -1) {
        content = content.replace('img', 'p').replace('查看', '').replace('删除', '').replace('img', 'p').replace('img', 'p').replace('img', 'p');
        contents = contents.replace('img', 'p').replace('look', '').replace('look', '').replace('delete', '').replace('img', 'p').replace('img', 'p').replace('img', 'p');
      }
    }
    let html;
    if (document.getElementById(table).outerHTML.indexOf('operate') > -1) {
      html = '<html><head><meta charset="utf-8" /></head><body>' + contents + '</body></html>';
    } else {
      html = '<html><head><meta charset="utf-8" /></head><body>' + content + '</body></html>';
    }
    // console.log(html);
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    const blob = new Blob([html], { type: 'text/excel' });
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    e.target.href = URL.createObjectURL(blob);
    e.target.download = '用户信息表.xls';
  }
}
