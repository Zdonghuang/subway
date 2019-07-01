import { BackManagementService } from './back-management.service';
import { Component, OnInit } from '@angular/core';
import { copyStyles } from '@angular/animations/browser/src/util';
import { error } from 'util';

@Component({
  selector: 'app-back-management',
  templateUrl: './back-management.component.html',
  styleUrls: ['./back-management.component.scss']
})
export class BackManagementComponent implements OnInit {
  public showlist = false;
  showtext = false;
  log = true;
  route = false;
  sensitive = false;
  loglist = [];
  routelist = [];
  senlist = {};
  loginfo = {};
  countnum;
  text = '';
  publics = false;
  showinfo = false;
  api = false;
  apilist = [];
  apilists = [];
  showroute = false;
  vapi = false;
  addroute = false;
  whitelist = false;
  whitelisttext = [];
  whitelisttexts = [];
  nownum = 1;
  routeinfo = {
    enabled: 0,
    stripPrefix: 1,
    retryable: 0,
    name: '',
    path: '',
    createTime: '',
    creator: '',
    description: '',
    modifier: null,
    sensitiveHeaders: '',
    updateTime: '',
  };
  userinfo = '';
  next = true;
  page = 1;
  nums;
  url = '';
  service = '';
  pagesize = 10;
  totalList = [];
  calssn = 'orderbottom';
  order = 'desc';
  orderBy = 'createTime';
  pages = 1;
  userinfos = '';
  num;
  pagesizes = 50;
  totalLists = [];
  calssns = 'orderbottoms';
  orders = 'desc';
  orderBys = 'createTime';
  word = '';
  pagesizess = 10;
  pagess = 1;
  totalListss = [];
  numss;
  calssnss = 'orderbottoms';
  orderss = 'desc';
  orderByss = 'createTime';
  addword = '';
  showaddwhite = false;
  showaddwhites = false;
  awhitelist = '';
  awhitelists = '';
  vapilist;
  vpage = 1;
  vpagesize = 100;
  vorder = 'id';
  vorderby = 'asc';
  showvapi = false;
  vapiconfig = false;
  updatevapi = false;
  commoninfo = {
    key: '',
    value: ''
  };
  addvanapi = {
    mapKey: '',
    mapUrl: '',
    modle: '',
    source: ''
  };
  apilistconfig;
  pageconfig = 1;
  pagesizeconfig = 100;
  orderconfig = 'id';
  orderbyconfig = 'asc';
  showvapiconfig = false;
  updatevapiconfig = false;
  addvanapiconfig = {
    mapKey: '',
    mapUrl: '',
    modle: '',
    source: ''
  };
  sms;
  mail;
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';

  constructor(private http: BackManagementService) { }

  ngOnInit() {
    this.getloglist();
    this.getroutelist();
    this.getsenlist();
    this.getwhitelist();
    this.getcountnum();
    this.getapi();
    this.getvapi();
    this.getvapiconfig();
    this.getcommoninfo();
    this.getsms();
    this.getmail();
  }
  getcommoninfo() {
    this.http.getCommoninfo()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.commoninfo = res.result;
      }
    });
  }
  updatecommoninfo() {
    if (confirm('你确定要修改吗？')) {
      this.http.updateCommoninfo(this.commoninfo)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功！';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  getwhitelist() {
    this.http.getWhiteList()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.whitelisttext = res.result.value.split(',');
        this.whitelisttexts = res.result.value.split(',');
      }
    });
  }
  getapi() {
    this.http.getApi()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.apilist = res.result.value.split(',');
        this.apilists = res.result.value.split(',');
      }
    });
  }
  whitemodify(e) {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'inline-block';
    e.target.parentElement.previousElementSibling.children[0].disabled = false;
  }
  getmail() {
    this.http.getEmail()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.mail = res.result;
      }
    });
  }
  updatemail() {
    if (confirm('你确定要修改吗？')) {
      this.http.updateEmail({key: 'emailFilterByIp', value: this.mail.value})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功!';
          this.showtext = true;
          this.getmail();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '修改失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  getsms() {
    this.http.getSms()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.sms = res.result;
      }
    });
  }
  updatesms() {
    if (confirm('你确定要修改吗？')) {
      this.http.updateSms({key: 'smsFilterByIp', value: this.sms.value})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功!';
          this.showtext = true;
          this.getsms();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '修改失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  getvapi() {
    this.http.getVapi({page: this.vpage, pagesize: this.vpagesize, order: this.vorder, orderby: this.vorderby})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.vapilist = res.result.api;
      }
    });
  }
  getvapiconfig() {
    this.http.getVapiconfig({page: this.pageconfig, pagesize: this.pagesizeconfig, order: this.orderconfig, orderby: this.orderbyconfig})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.apilistconfig = res.result.config;
      }
    });
  }
  delvapi(id) {
    if (confirm('确定要删除此项吗？')) {
      this.http.delVapi(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.getvapi();
        }
      });
    }
  }
  delvapiconfig(id) {
    if (confirm('确定要删除此项吗？')) {
      this.http.delVapiconfig(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.getvapiconfig();
        }
      });
    }
  }
  addvapi() {
    this.http.addVapi(this.addvanapi)
    .subscribe(res => {
      if (res.status === 'ok') {
        this.getvapi();
        this.showvapi = false;
        this.text = '添加成功!';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1000);
      }
    });
  }
  addvapiconfig() {
    this.http.addVapiconfig(this.addvanapiconfig)
    .subscribe(res=> {
      if (res.status === 'ok') {
        this.getvapiconfig();
        this.showvapiconfig = false;
      }
    });
  }
  updatevapis() {
    this.http.updateVapis(this.addvanapi)
    .subscribe(res => {
      if (res.status === 'ok') {
        this.getvapi();
        this.updatevapi = false;
      }
    });
  }
  updatevapisconfig() {
    this.http.updateVapiconfig(this.addvanapiconfig)
    .subscribe(res => {
      if (res.status === 'ok') {
        this.getvapiconfig();
        this.updatevapiconfig = false;
      }
    });
  }
  whitemodifys(e) {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'inline-block';
    e.target.parentElement.previousElementSibling.children[0].disabled = false;
  }
  addwhite() {
    if (this.awhitelist) {
      this.whitelisttexts.push(this.awhitelist);
      const data = this.whitelisttexts.join();
      this.http.addWhite({key: 'auth_whitelist', value: data})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.text = '添加成功!';
            this.showtext = true;
            this.showaddwhite = false;
            this.getwhitelist();
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          } else {
            this.text = '添加失败!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          }
        });
    }
  }
  addwhites() {
    if (this.awhitelists) {
      this.apilist.push(this.awhitelists);
      const data = this.apilist.join();
      this.http.addWhites({key: 'apiAuthPrefix', value: data})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.text = '添加成功!';
            this.showtext = true;
            this.showaddwhites = false;
            this.getapi();
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          } else {
            this.text = '添加失败!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          }
        });
    }
  }
  modifycon(n, e) {
    this.whitelisttext.filter((item, index) => {
      if (item === n) {
        this.whitelisttexts[index] = e.target.value;
      }
    });
  }
  modifycons(n, e) {
    this.apilist.filter((item, index) => {
      if (item === n) {
        this.apilists[index] = e.target.value;
      }
    });
  }
  updatewhite(e) {
    if (e.target.innerHTML === '确定') {
      this.whitelisttexts.filter((item, index) => {
        if (item === '') {
          this.whitelisttexts.splice(index, 1);
        }
      });
      const data = this.whitelisttexts.join();
      this.http.updateWhite({key: 'auth_whitelist', value: data})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功!';
          this.showtext = true;
          this.getwhitelist();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          e.target.style.display = 'none';
          e.target.previousElementSibling.style.display = 'inline-block';
          e.target.parentElement.previousElementSibling.children[0].disabled = true;
        } else {
          this.text = '修改失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  updatewhites(e) {
    if (e.target.innerHTML === '确定') {
      this.apilists.filter((item, index) => {
        if (item === '') {
          this.apilists.splice(index, 1);
        }
      });
      const data = this.apilists.join();
      this.http.updateWhites({key: 'auth_whitelist', value: data})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功!';
          this.showtext = true;
          this.getapi();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          e.target.style.display = 'none';
          e.target.previousElementSibling.style.display = 'inline-block';
          e.target.parentElement.previousElementSibling.children[0].disabled = true;
        } else {
          this.text = '修改失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  getloglist() {
    this.http.getLogList({'pageNum': this.page, 'pageSize': this.pagesize, 'order': this.order, 'orderBy': this.orderBy, 'userInfo': this.userinfo})
    .subscribe(res => {
      if (res.status === 'ok' && res.result.result.length) {
        this.showlist = true;
        this.next = true;
        this.nums = Math.ceil(res.result.count / this.pagesize);
        this.loglist = res.result.result;
          if (!this.totalList.length) {
            for (let i = 1 ; i <= 10 ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'actives'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
          }
      }
    });
  }
  getcountnum() {
    this.http.getCountNum()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.countnum = res.result;
      }
    });
  }
  getroutelist() {
    this.http.getRouteList({'pageNum': this.pages, 'pageSize': this.pagesizes, 'order': this.orders, 'orderBy': this.orderBys, 'routeInfo': this.userinfos})
    .subscribe(res => {
      this.next = true;
      if (res.status === 'ok' && res.result.result.length) {
        this.showlist = true;
        this.num = Math.ceil(res.result.count / this.pagesizes);
        this.routelist = res.result.result;
          if (!this.totalLists.length) {
            for (let i = 1 ; i <= this.num ; i++) {
              if (i === 1) {
                this.totalLists.push({num: i, stylename: 'actives'});
              } else {
                this.totalLists.push({num: i, stylename: ''});
              }
            }
          }
      }
    });
  }
  getasenlist() {
    if (this.word) {
      this.pagess = 1;
      this.pagesizess = 10;
      this.orderss = 'asc';
      this.orderByss = 'id';
      this.http.getAsenList({word: this.word, 'order': this.orderByss, 'orderby': this.orderss, 'page': this.pagess, 'pagesize': this.pagesizess})
      .subscribe(res => {
        this.next = true;
        if (res.status === 'ok' && res.result.length) {
          this.totalListss = [];
          this.senlist = res.result;
          this.next = true;
          this.numss = Math.ceil(res.result.length / this.pagesizess);
            if (!this.totalListss.length) {
              for (let i = 1 ; i <= this.numss ; i++) {
                if (i === 1) {
                  this.totalListss.push({num: i, stylename: 'actives'});
                } else {
                  this.totalListss.push({num: i, stylename: ''});
                }
              }
            }
        } else {
          this.senlist = [];
        }
      });
    } else {
      this.pagess = 1;
      this.pagesizess = 10;
      this.orderss = 'desc';
      this.orderByss = 'id';
      this.totalListss = [];
      this.getsenlist();
    }
  }
  getsenlist() {
    this.http.getSenList({'order': this.orderByss, 'orderby': this.orderss, 'page': this.pagess, 'pagesize': this.pagesizess})
    .subscribe(res => {
      this.next = true;
      if (res.status === 'ok') {
        this.senlist = res.result.word;
        this.next = true;
        this.numss = Math.ceil(res.result.count / this.pagesizess);
          if (!this.totalListss.length) {
            for (let i = 1 ; i <= 10 ; i++) {
              if (i === 1) {
                this.totalListss.push({num: i, stylename: 'actives'});
              } else {
                this.totalListss.push({num: i, stylename: ''});
              }
            }
          }
      } else {
        this.senlist = [];
      }
    });
  }
  addsenword() {
    this.http.addSenWord({word: this.addword})
    .subscribe(res => {
      this.next = true;
      if (res.status === 'ok') {
        this.text = '添加成功!';
        this.showtext = true;
        this.getsenlist();
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1000);
      } else {
        this.text = '添加失败!';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1000);
      }
    });
  }
  delsenword(id) {
    if (confirm('确定要删除吗？')) {
      this.http.delSenWord({id: id})
      .subscribe(res => {
        this.next = true;
        if (res.status === 'ok') {
          this.text = '删除成功!';
          this.getsenlist();
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '删除失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  logindex(e) {
    if (e.target.nodeName === 'LI' && this.next) {
        this.next = false;
        if (this.page === this.nums && e.target.innerHTML === '»') {
          this.getloglist();
          return;
        } else if (e.target.innerHTML === '«') {
          const li = document.getElementsByClassName('actives')[0];
          const firstnum = Number(document.getElementsByClassName('page')[0].children[1].innerHTML);
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
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
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
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
        this.getloglist();
        const liss = document.getElementsByClassName('page')[0].children;
        if (this.page !== 1) {
          liss[0].className = 'prev';
        } else {
          liss[0].className = 'prev prevv';
        }
        if (this.page !== this.nums) {
          liss[11].className = 'next';
        } else {
          liss[11].className = 'next prevv';
        }
    }
  }
  logindexss(e) {
    if (e.target.nodeName === 'LI' && this.next) {
      if (this.pagess <= this.numss) {
        this.next = false;
        if (e.target.innerHTML === '«') {
          const li = document.getElementsByClassName('actives')[0];
          const firstnum = Number(document.getElementsByClassName('page')[0].children[1].innerHTML);
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
          if (firstnum === Number(li.innerHTML) && lastnum > 10) {
            li.className = '';
            this.pagess = Number(li.innerHTML) - 1;
            this.totalListss.unshift({num: this.pagess, stylename: 'actives'});
            this.totalListss.pop();
          } else if (this.pagess > 1) {
            li.className = '';
            this.pagess = Number(li.innerHTML) - 1;
            li.previousElementSibling.className = 'actives';
          }
        } else if ((e.target.innerHTML === '»') && this.pagess < this.numss) {
          const li = document.getElementsByClassName('actives')[0];
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
          if (this.pagess < 10) {
            li.className = '';
            this.pagess = Number(li.innerHTML) + 1;
            li.nextElementSibling.className = 'actives';
          } else if (this.pagess < this.numss && this.pagess === lastnum) {
            li.className = '';
            this.pagess = this.pagess + 1;
            this.totalListss.shift();
            this.totalListss.push({num: this.pagess, stylename: 'actives'});
          } else {
            li.className = '';
            this.pagess = Number(li.innerHTML) + 1;
            li.nextElementSibling.className = 'actives';
          }
        } else if ((e.target.innerHTML !== '«') && e.target.innerHTML !== '»') {
          const lis = document.getElementsByClassName('page')[0].children;
          for (let i = 1 ; i < lis.length - 1 ; i++) {
            lis[i].className = '';
          }
          e.target.className = 'actives';
          this.pagess = Number(e.target.innerHTML);
        }
        if (this.word) {
          this.getasenlist();
        } else {
          this.getsenlist();
        }
        const liss = document.getElementsByClassName('page')[0].children;
        if (this.pagess !== 1) {
          liss[0].className = 'prev';
        } else {
          liss[0].className = 'prev prevv';
        }
        if (this.pagess !== this.numss) {
          liss[11].className = 'next';
        } else {
          liss[11].className = 'next prevv';
        }
      }
    }
  }
  setpagesize(e) {
    this.pagesize = Number(e);
    this.getloglist();
  }
  setpagesizess(e) {
    this.pagesizess = Number(e);
    this.getsenlist();
  }
  setpage(e) {
    const page = Number(e);
    if (page > 9 && page <= this.nums) {
      this.page = page;
      this.totalList = [];
      for (let i = page - 9; i <= page ; i++) {
        if (i === page) {
          this.totalList.push({num: i, stylename: 'actives'});
        } else {
          this.totalList.push({num: i, stylename: ''});
        }
      }
    } else if (page <= 9) {
      this.page = page;
      this.totalList = [];
    }
    this.getloglist();
    const liss = document.getElementsByClassName('page')[0].children;
        if (this.page !== 1) {
          liss[0].className = 'prev';
        } else {
          liss[0].className = 'prev prevv';
        }
        if (this.page !== this.nums) {
          liss[11].className = 'next';
        } else {
          liss[11].className = 'next prevv';
        }
  }
  setpagess(e) {
    const page = Number(e);
    if (page > 9 && page <= this.numss) {
      this.pagess = page;
      this.totalListss = [];
      for (let i = page - 9; i <= page ; i++) {
        if (i === page) {
          this.totalListss.push({num: i, stylename: 'actives'});
        } else {
          this.totalListss.push({num: i, stylename: ''});
        }
      }
    } else if (page <= 9) {
      this.pagess = page;
      this.totalListss = [];
    }
    this.getsenlist();
    const liss = document.getElementsByClassName('page')[0].children;
        if (this.pagess !== 1) {
          liss[0].className = 'prev';
        } else {
          liss[0].className = 'prev prevv';
        }
        if (this.pagess !== this.numss) {
          liss[11].className = 'next';
        } else {
          liss[11].className = 'next prevv';
        }
  }
  setactive(e, val) {
    const arr = [
      'log',
      'route',
      'sensitive',
      'whitelist',
      'api',
      'publics',
      'vapi',
      'vapiconfig'
    ];
    for (let i = 0; i < arr.length; i++) {
      this[arr[i]] = false;
    }
    this[val] = true;
    if (e.target.nodeName === 'LI') {
      const lis = document.getElementsByClassName('list')[0].children;
      for (let i = 0 ; i < lis.length ; i++) {
        lis[i].className = '';
      }
      e.target.className = 'active';
    }
  }
  setorder(val) {
    this.orderBy = val;
    this.getloglist();
  }
  setorders(val) {
    this.orderBys = val;
    this.getroutelist();
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
      this.getloglist();
    }
  }
  setorderbys() {
    if (this.next) {
      if (this.calssns === 'orderbottoms') {
        this.calssns = 'ordertops';
        this.orders = 'desc';
      } else {
        this.calssns = 'orderbottoms';
        this.orders = 'asc';
      }
      this.next = false;
      this.getroutelist();
    }
  }
  addnewroute() {
    if (this.routeinfo.name && this.routeinfo.path) {
      this.http.addNewRoute(this.routeinfo)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '添加成功!';
            this.showtext = true;
            this.showroute = false;
            this.addroute = false;
            this.getroutelist();
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          } else {
            this.text = '添加失败!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1000);
          }
      });
    }
  }
  dellog(id) {
    if (confirm('确定要删除吗？')) {
      this.http.delLog(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '删除成功!';
          this.showtext = true;
          this.getloglist();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '删除失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  delroute(id) {
    if (confirm('确定要删除吗？')) {
      this.http.delRoute(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '删除成功!';
          this.showtext = true;
          this.getroutelist();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '删除失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  setenabled(con) {
    if (confirm('确定要改变状态吗？')) {
      this.routeinfo = JSON.parse(JSON.stringify(con));
      if (this.routeinfo.enabled === 1) {
        this.routeinfo.enabled = 0;
      } else {
        this.routeinfo.enabled = 1;
      }
      this.uproute();
    }
  }
  setnum(val, e) {
    if (val === 'stripPrefix') {
      this.routeinfo.stripPrefix = Number(e);
    }
    if (val === 'retryable') {
      this.routeinfo.retryable = Number(e);
    }
    if (val === 'enabled') {
      this.routeinfo.enabled = Number(e);
    }
    if (val === 'serviceId' && e) {
      this.url = 'disabled';
    } else {
      this.url = '';
    }
    if (val === 'url' && e) {
      this.service = 'disabled';
    } else {
      this.service = '';
    }
    if (val === 'name' && e) {
      this.routeinfo.name = e;
      this.routeinfo.path = `/${e}/**`;
    } else {
      this.routeinfo.path = '';
    }
  }
  uproute() {
    this.http.updateRoute(this.routeinfo)
    .subscribe(res => {
      if (res.status === 'ok') {
          this.text = '操作成功!';
          this.showtext = true;
          this.showroute = false;
          this.getroutelist();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        } else {
          this.text = '操作失败!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
    });
  }
  showmoudle() {
    this.routeinfo = {
      enabled: 0,
      stripPrefix: 1,
      retryable: 0,
      name: '',
      path: '',
      createTime: '',
      creator: '',
      description: '',
      modifier: null,
      sensitiveHeaders: '',
      updateTime: '',
    };
    this.addroute = true;
  }
}
