import { ReviewAppService } from './review-app.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-review-app',
  templateUrl: './review-app.component.html',
  styleUrls: ['./review-app.component.scss']
})
export class ReviewAppComponent implements OnInit {
  public showlist = false;
  public applist = [];
  public totalList = [];
  public next = true;
  public showtext = false;
  public text = '';
  search_app = '';
  states = ['2', '3', '4', '6'];
  url;
  appState = 0;
  urlid;
  category = [];
  showcont = false;
  showtable = false;
  public confirm;
  showuserinfo = false;
  orderBy = 'createTime';
  count = 0;
  order = 'asc';
  pagesize = 10;
  calssn = 'orderbottom';
  appinfo;
  deli;
  deln;
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  image = {
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  };
  bigpic = '';
  showpic = false;
  page = 1;
  nums;
  constructor(private http: ReviewAppService) { }

  ngOnInit() {
    this.getapplist(1);
  }
  appindex(e) {
    if (e.target.nodeName === 'LI' && this.next) {
      this.next = false;
      if (this.page === this.nums && e.target.innerHTML === '»') {
        this.getapplist(this.page);
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
        } else if (this.page < this.nums && this.page === lastnum) {
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
      this.getapplist(this.page);
      const liss = document.getElementsByClassName('page')[0].children;
      if (this.page !== 1) {
        liss[0].className = 'prev';
      } else {
        liss[0].className = 'prev prevv';
      }
      if (this.page !== this.nums) {
        liss[liss.length - 1].className = 'next';
      } else {
        liss[liss.length - 1].className = 'next prevv';
      }
    }
  }
  goReview(item) {
    this.confirm = `确定要对${item.appname}进行后台配置吗？`;
    if (confirm(this.confirm)) {
      this.http.goReview(item.id)
      .subscribe(data => {
        if (data.status === 'ok') {
          this.urlid = item.id;
          this.url = data.result;
          this.getapplist(sessionStorage.getItem('text'));
          this.showtext = true;
          this.text = '配置成功！';
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        } else {
          this.showtext = true;
          this.text = '配置失败！';
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        }
      });
    }
  }
  searchApp() {

  }
  goRelease(item) {
    this.confirm = `确定要发布${item.appname}吗？`;
    if (confirm(this.confirm)) {
      this.http.goRelease(item.id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.showtext = true;
          this.text = '发布成功！';
          this.getapplist(sessionStorage.getItem('text'));
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        } else {
          this.showtext = true;
          this.text = '发布失败！';
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        }
      });
    }
  }
  goObtained(item) {
    this.confirm = `确定要撤销${item.appname}吗？`;
    if (confirm(this.confirm)) {
      this.http.goObtained(item.id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.showtext = true;
          this.text = '撤销成功！';
          this.url = '';
          this.getapplist(sessionStorage.getItem('text'));
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        } else {
          this.showtext = true;
          this.text = '撤销失败！';
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        }
      });
    }
  }
  updateaApp(item, num) {
    this.appinfo = JSON.parse(JSON.stringify(item));
    this.appinfo.isShow = num;
    this.upappifo();
  }
  setState(e) {
    this.appinfo.state = e;
    this.appState = Number(e);
  }
  upappifo() {
    console.log(this.appinfo.state);
    const appinfo = JSON.parse(JSON.stringify(this.appinfo));
    if (appinfo.image !== 'assets/images/deful.jpg') {
      appinfo.image = appinfo.image.split('/')[appinfo.image.split('/').length - 1];
    } else {
      appinfo.image = '';
    }
    if (appinfo.viewPager !== null && appinfo.viewPager !== 'null') {
      appinfo.viewPager = JSON.stringify(appinfo.viewPager);
    } else {
      appinfo.viewPager = null;
    }
    if (this.appState === 3) {
      this.http.upappifo({'2': this.appinfo.userEmail, htmlReplace: {appName: this.appinfo.appname, userName: this.appinfo.userName, version: this.appinfo.version}})
      .subscribe(res => {
        this.appState = 0;
      });
    }
    if (this.appState === 6) {
      this.http.upappifo({'1': this.appinfo.userEmail, htmlReplace: {appName: this.appinfo.appname, userName: this.appinfo.userName, version: this.appinfo.version}})
      .subscribe(res => {
        this.appState = 0;
      });
    }
    this.http.updateApp(appinfo)
    .subscribe(res => {
      if (res.status === 'ok') {
        this.text = '修改APP信息成功!';
        this.showtext = true;
        this.getapplist(sessionStorage.getItem('text'));
        this.bigpic = '';
        this.image = {
          image1: '',
          image2: '',
          image3: '',
          image4: ''
        };
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
          this.showuserinfo = false;
        }, 1000);
      } else {
        this.text = '修改APP信息失败!';
        this.showtext = true;
        this.bigpic = '';
        this.image = {
          image1: '',
          image2: '',
          image3: '',
          image4: ''
        };
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1000);
      }
    });
  }
  opencont(item) {
    this.appinfo = item;
    this.showcont = true;
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
      this.getapplist(1);
    }
  }
  openimg(item) {
    this.appinfo = JSON.parse(JSON.stringify(item));
    this.bigpic = this.appinfo.image;
    if (item.viewPager && item.viewPager !== 'null') {
      this.image = JSON.parse(JSON.stringify(this.appinfo.viewPager));
    } else {
      this.appinfo.viewPager = JSON.parse(JSON.stringify(this.image));
    }
    this.showpic = true;
  }
  upapppic(n, e, img) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.http.updateImg(formData)
      .subscribe((data) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功!';
          if (img.indexOf('www') > -1) {
            this.http.deleteAppImage({imageFullPath: img, type: 'app', typeId: this.appinfo.id})
            .subscribe((res) => {
            });
          }
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          this.deln = n;
          const Image = `https://${this.leap}/images/${data.result}`;
          if (n === 'bigpic') {
            this.bigpic = `https://${this.leap}/images/${data.result}`;
            this.appinfo.image = this.bigpic.split('/')[this.bigpic.split('/').length - 1];
          } else if (n === 'image1') {
            this.image.image1 = Image;
            this.appinfo.viewPager.image1 = this.image.image1;
          } else if (n === 'image2') {
            this.image.image2 = Image;
            this.appinfo.viewPager.image2 = this.image.image2;
          } else if (n === 'image3') {
            this.image.image3 = Image;
            this.appinfo.viewPager.image3 = this.image.image3;
          } else if (n === 'image4') {
            this.image.image4 = Image;
            this.appinfo.viewPager.image4 = this.image.image4;
          }
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
  hidepic() {
    this.showpic = false;
    this.bigpic = '';
    this.image = {
      image1: '',
      image2: '',
      image3: '',
      image4: ''
    };
    let n;
    switch (this.deln) {
      case 'bigpic':
        n = this.appinfo.image;
        break;
        case 'image1':
        n = this.appinfo.viewPager.image1;
        break;
        case 'image2':
        n = this.appinfo.viewPager.image2;
        break;
        case 'image3':
        n = this.appinfo.viewPager.image3;
        break;
        case 'image4':
        n = this.appinfo.viewPager.image4;
        break;
    }
    this.http.deleteAppImage({imageFullPath: n, type: 'app', typeId: this.appinfo.id})
    .subscribe((res) => {});
  }
  delimg(img, n) {
    if (img.indexOf('www') > -1) {
      if (confirm('确定要删除此图片吗？')) {
        this.http.deleteAppImage({imageFullPath: img, type: 'app', typeId: this.appinfo.id})
        .subscribe((res) => {
          if (res.status === 'ok') {
            switch (n) {
              case 'bigpic':
                this.appinfo.image = '';
                break;
              case 'image1':
                this.appinfo.viewPager.image1 = '';
                break;
              case 'image2':
                this.appinfo.viewPager.image2 = '';
                break;
              case 'image3':
                this.appinfo.viewPager.image3 = '';
                break;
              case 'image4':
                this.appinfo.viewPager.image4 = '';
                break;
            }
          }
          this.showpic = false;
          this.upappifo();
        });
      }
    }
  }
  setorderbys() {
    if (this.next) {
      if (this.calssn === 'orderbottom') {
        this.calssn = 'ordertop';
        this.order = 'desc';
      } else {
        this.calssn = 'orderbottom';
        this.order = 'asc';
      }
      this.next = false;
      this.getapplist(1);
    }
  }
  setstate(e) {
    if (e.target.value > 20) {
      this.showtable = true;
      this.pagesize = this.count;
      this.states = ['2', '3', '4', '6'];
      this.totalList = [];
      this.getapplist(1);
    } else if (e.target.value === '10' || e.target.value === '15' || e.target.value === '20') {
      this.showtable = false;
      this.pagesize = Number(e.target.value);
      this.totalList = [];
      this.getapplist(1);
    } else if (e.target.value === '3' || e.target.value === '4') {
      this.showtable = false;
      this.totalList = [];
      this.states = ['3', '4'];
      this.getapplist(1);
    } else if (e.target.value === '2') {
      this.showtable = false;
      this.totalList = [];
      this.states = ['2'];
      this.getapplist(1);
    } else if (e.target.value === '6') {
      this.showtable = false;
      this.totalList = [];
      this.states = ['6'];
      this.getapplist(1);
    }
  }
  setorder(oname) {
    if (this.next) {
      this.next = false;
      this.orderBy = oname;
      this.getapplist(1);
    }
  }
  settext(e) {
    this.appinfo.description = `${e.target.value}`;
  }
  categoryChange(e, n) {
    this.appinfo.category = e.target.value;
    if (n === 1) {
      const input = document.getElementById('category') as HTMLInputElement;
      input.value = '';
    }
  }
  setcategory(num) {
    this.http.getAll({'states': [2, 3, 4, 5, 6], 'pageNum': 1, 'pageSize': num, 'order': this.order, 'orderBy': this.orderBy})
    .subscribe(dat => {
      if (dat.status === 'ok') {
        dat.result.appList.filter(item => {
          if (this.category.indexOf(item.category) === -1 && item.category) {
            this.category.push(item.category);
          }
        });
      }
    });
  }
  getapplist(text) {
    sessionStorage.setItem('text', text);
    this.http.getAll({'appname': this.search_app, 'states': this.states,
    'pageNum': text, 'pageSize': this.pagesize, 'order': this.order, 'orderBy': this.orderBy})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.category = [];
        this.next = true;
        res.result.appList.filter(item => {
          if (item.image && item.image.indexOf('www') === -1) {
            item.image = item.image.length > 5 ? `https://${this.leap}/images/${item.image}` : 'assets/images/deful.jpg';
          }
          if (item.image === null || item.image.length < 4) {
            item.image = 'assets/images/deful.jpg';
          }
          if (item.viewPager) {
            item.viewPager = JSON.parse(item.viewPager);
          }
        });
        this.applist = res.result.appList;
        if (res.result.count > this.count) {
          this.count = res.result.count;
        }
        const num = Math.ceil(res.result.count / this.pagesize);
        this.nums = num;
        if (!this.totalList.length) {
           if (this.nums >= 10) {
            for (let i = 1 ; i <= 10 ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'actives'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
           } else {
            for (let i = 1 ; i <= this.nums ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'actives'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
           }
        }
        this.showlist = true;
        this.setcategory(this.count);
      }
      this.next = true;
    });
  }
  toExcel(table, e) {
    let content = document.getElementById(table).outerHTML.replace('图片', '').replace('是否显示', '').replace('isShow', '').replace('image', '').replace('operate', '').replace('操作', '').replace('一键配置', '').replace('one-click configuration', '');
    for (let i = 0; i < this.count; i++) {
      if (content.indexOf('yes') > -1 || content.indexOf('是') > -1) {
        content = content.replace('img', 'p').replace('是', '').replace('yes', '');
      } else if (content.indexOf('no') > -1 || content.indexOf('否') > -1) {
        content = content.replace('img', 'p').replace('否', '').replace('no', '');
      }
    }
    let html;
    if (document.getElementById(table).outerHTML.indexOf('operate') > -1) {
      html = '<html><head><meta charset="utf-8" /></head><body>' + content + '</body></html>';
    } else {
      html = '<html><head><meta charset="utf-8" /></head><body>' + content + '</body></html>';
    }
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    const blob = new Blob([html], { type: 'text/excel' });
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    e.target.href = URL.createObjectURL(blob);
    e.target.download = 'app信息表.xls';
  }
}
