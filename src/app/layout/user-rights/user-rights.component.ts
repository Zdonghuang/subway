import { Component, OnInit } from '@angular/core';
import { UserRightsService } from './user-rights.service';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.scss']
})
export class UserRightsComponent implements OnInit {
  showlist = false;
  showrqx = false;
  showrqxs = false;
  list = false;
  public show = false;
  public showrole = false;
  public showqx = false;
  showuprole = false;
  public showdelqx = false;
  public modifyrights = false;
  public newrole = '';
  public text = '';
  newroleqx = '';
  allrole = [];
  pagenum = 1;
  newroletext = '';
  public num = 1;
  public showtext = false;
  userrole = [];
  public nouserrole = [];
  just = [];
  numm;
  rolename = [];
  showcon = 0;
  textlist = [];
  mobile = '';
  roleid;
  oldroleid;
  roletotalPages = [];
  userid = '';
  tip = '';
  newNav = '';
  super = sessionStorage.getItem('show');
  arr = [];
  arrs = [];
  next = true;
  showupuser = false;
  anewrightsuser;
  aoldrightsuser = 1;
  option = '';
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  public newrightsuser = {
    roleid: '',
    mobile: ''
  };
  constructor(private http: UserRightsService) { }

  ngOnInit() {
    this.getRightsList();
    this.getRightsName();
  }
  navrights() {
    if (this.roleid) {
      if (this.newNav) {
        if (this.roleid === '1') {
          this.arr.push(this.newNav);
        } else {
          this.text = '新导航必须添加给超级管理员！';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
          return;
        }
      }
      this.http.addNav(JSON.parse(`{"${this.roleid}":"[${this.arr}]"}`))
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功';
          this.getRightsName();
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
            this.list = false;
          }, 1400);
        } else {
          this.text = '修改失败';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1400);
        }
      });
    } else {
      this.text = '请选择角色';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1400);
    }
  }
  upnewrole() {
    if (this.anewrightsuser) {
      this.http.upNewRole({roleid: this.aoldrightsuser, rolename: this.anewrightsuser})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.text = '修改成功！';
            this.showtext = true;
            this.getRightsList();
            this.getRightsName();
            setTimeout(() => {
              this.showtext = false;
              this.showupuser = false;
              this.text = '';
            }, 1400);
          } else {
            this.text = '修改失败！';
            this.showtext = true;
            setTimeout(() => {
              this.showtext = false;
              this.text = '';
            }, 1400);
          }
        });
    } else {
      this.text = '请输入角色名称！';
      this.showtext = true;
      setTimeout(() => {
        this.showtext = false;
        this.text = '';
      }, 1400);
    }
  }
  upnewqx() {
    if (this.showcon && this.newroleqx && this.newroletext) {
      this.http.upNewqx({perid: this.showcon, perurl: this.newroleqx, perurldetail: this.newroletext})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.text = '修改成功!';
            this.getRightsList();
            this.showtext = true;
            setTimeout(() => {
              this.showuprole = false;
              this.text = '';
              this.showtext = false;
            }, 1400);
          } else {
            this.text = '修改失败!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1400);
          }
        });
    } else {
      this.text = '请选择权限或将信息填完整!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1400);
    }
  }
  newuserrights() {
    if (this.next) {
      this.next = false;
      if (this.newrightsuser.mobile) {
        this.http.queryuseronly({mobile: this.newrightsuser.mobile})
        .subscribe(data => {
          if (data.status === 'ok') {
            this.http.adduserrole({userid: data.result.id, roleid : this.newrightsuser.roleid})
            .subscribe(res => {
              if (res.status === 'ok') {
                this.tip = '添加成功！';
                setTimeout(() => {
                  this.getRightsList();
                  this.tip = '';
                  this.next = true;
                  this.show = false;
                }, 1000);
              } else {
                this.tip = '添加失败！';
                setTimeout(() => {
                  this.tip = '';
                  this.next = true;
                }, 1000);
              }
            });
          } else {
            this.tip = '手机号不存在！';
            setTimeout(() => {
              this.tip = '';
              this.next = true;
            }, 1000);
          }
        });
      } else {
        this.tip = '请输入手机号！';
        setTimeout(() => {
          this.tip = '';
          this.next = true;
        }, 1000);
      }
    }
  }
  uprightsuser(uid, uname) {
    this.modifyrights = true;
    this.mobile = uname;
    this.roleid = this.num;
    this.oldroleid = this.num;
    this.userid = uid;
  }
  addnewroleqx() {
    if (this.newroleqx && this.newroletext) {
      this.http.addpermission({perurl: this.newroleqx, perurldetail: this.newroletext})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.showtext = true;
          this.text = '添加新权限成功!';
          this.getRightsList();
          this.getRightsName();
          setTimeout(() => {
            this.showtext = false;
            this.showqx = false;
            this.text = '';
          }, 1400);
        } else {
          this.showtext = true;
          this.text = '添加新权限失败!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1400);
        }
      });
    } else {
      this.showtext = true;
      this.text = '请将信息填写完整!';
      setTimeout(() => {
        this.showtext = false;
        this.text = '';
      }, 1400);
    }
  }
  addnav(path) {
    if (this.arr.indexOf(path) === -1 && this.roleid) {
      this.arr.push(path);
    }
  }
  removenav(path) {
    if (this.roleid !== '1') {
      this.arr.filter((item, index) => {
        if (item === path) {
          this.arr.splice(index, 1);
        }
      });
    } else if (confirm('确定要删除此导航吗？')) {
      this.arr.filter((item, index) => {
        if (item === path) {
          this.arr.splice(index, 1);
        }
      });
    }
  }
  addnewrole() {
    if (this.newrole) {
      this.http.addrole({rolename: this.newrole})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.showtext = true;
            this.text = '添加新角色成功!';
            this.getRightsName();
            setTimeout(() => {
              this.showtext = false;
              this.text = '';
              this.showrole = false;
            }, 1400);
          } else {
            this.showtext = true;
            this.text = '添加新角色失败!';
            setTimeout(() => {
              this.showtext = false;
              this.text = '';
            }, 1400);
          }
        });
    } else {
      this.showtext = true;
      this.text = '添加新权限失败!';
      setTimeout(() => {
        this.showtext = false;
        this.text = '';
      }, 1400);
    }
  }
  modify() {
    this.http.updateuserrole({userid: this.userid, oldroleid: this.oldroleid, newroleid: Number(this.roleid)})
        .subscribe(res => {
          if (res.status === 'ok') {
            this.tip = '修改成功！';
            setTimeout(() => {
              this.getRightsList();
              this.tip = '';
              this.modifyrights = false;
            }, 1000);
          } else {
            this.tip = '修改失败！';
            setTimeout(() => {
              this.tip = '';
            }, 1000);
          }
        });
  }
  delrightsuser(uid, rid, uname) {
    if (confirm(`确定要删除${uname}用户吗?`)) {
      this.http.deleteuserrole({userid: uid, roleid: rid})
        .subscribe(res => {
          this.getRightsList();
        });
    }
  }
  setnum(id) {
    if (this.next) {
      this.num = id;
      this.numm = id;
      this.next = false;
      this.getRightsList();
    }
  }
  close(id) {
    if (confirm('确定要删除当前角色吗？') && this.next) {
      this.next = false;
      this.http.deleterole({roleid: id})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.showtext = true;
          this.text = '删除角色成功!';
          this.getRightsName();
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1400);
        } else {
          this.showtext = true;
          this.text = '删除角色失败!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1400);
        }
      });
    }
  }
  setrole(e) {
    this.arr = [];
    this.rolename.filter(item => {
      if (Number(e.target.value) === item.id && item.path) {
        this.arr = item.path.slice(1, -1).split(',');
      }
    });
    this.roleid = '';
    this.roleid = e.target.value;
  }
  getRightsName() {
    this.http.queryroleall()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.next = true;
        this.rolename = res.result;
        res.result.filter(item => {
          if (item.id === 1) {
            this.arrs = item.path.slice(1, -1).split(',');
          }
        });
      } else {
        this.next = true;
      }
    });
  }
  all() {
    this.http.querypermission({ page: 1, pagesize: 200, orderby: 'desc'})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.allrole = res.result.permissions;
      }
    });
  }
  allRights() {
    this.http.querypermission({ page: 1, pagesize: 200, orderby: 'desc'})
    .subscribe(res => {
      this.next = true;
      this.all();
      if (res.status === 'ok') {
        this.nouserrole = [];
        res.result.permissions.filter((item, index) => {
          if (this.just.indexOf(item.per_url_detail) > -1) {
            res.result.permissions[index] = {};
          }
        });
        this.nouserrole = res.result.permissions;
      }
    });
  }
  adduserrole(id) {
    if (this.next) {
      this.next = false;
      this.http.addrolepermission({ roleid: this.num, perids: [id]})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.getRightsList();
          this.getRightsName();
        }
      });
    }
  }
  deluserrole(id) {
    if (this.next && this.num !== 1) {
      this.next = false;
      this.http.deleterolepermission({roleid: this.num, perids: [id]})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.getRightsList();
          this.getRightsName();
        }
      });
    } else if (confirm('你确定要永久删除此权限吗？')) {
      this.next = false;
      this.http.deleterolepermission({roleid: this.num, perids: [id]})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.showtext = true;
          this.text = '删除权限成功！';
          this.getRightsList();
          this.getRightsName();
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1400);
        }
      });
    }
  }
  roleindex(index) {
    if (index.target.nodeName === 'LI' && this.next) {
      this.next = false;
      for (let i = 0 ; i < this.roletotalPages.length ; i++) {
        this.roletotalPages[i].stylename = '';
      }
      this.roletotalPages[Number(index.target.innerHTML) - 1].stylename = 'active';
      this.pagenum = Number(index.target.innerHTML);
      this.getRightsList();
    }
  }
  getRightsList() {
    this.http.queryuserbyrole({roleid: this.num, page: this.pagenum, pagesize: 100, orderby: 'asc', order: 'id'})
    .subscribe(res => {
      if (res.status === 'ok') {
        res.result.user.filter(item => {
          item.roleid = this.num;
        });
        this.textlist = [];
        this.showlist = true;
        this.next = true;
        this.textlist = res.result.user;
        const page = Math.ceil(res.result.count / 100);
        if (page !== this.roletotalPages.length) {
          this.roletotalPages = [];
        }
        if (!this.roletotalPages.length) {
          for (let i = 1 ; i <= page ; i++) {
            if (i === 1) {
              this.roletotalPages.push({num: i, stylename: 'active'});
            } else {
              this.roletotalPages.push({num: i, stylename: ''});
            }
          }
        }
      }
    });
    this.http.querypermissionsbyrole({roleid: this.num})
    .subscribe(data => {
      if (data.status === 'ok') {
        this.just = [];
        data.result.permissions.filter(item => {
          this.just.push(item.per_url_detail);
        });
        this.userrole = [];
        this.userrole = data.result.permissions;
        this.allRights();
      }
    });
  }
  toggle(e) {
    if (e.target.className === 'arrow-right') {
      e.target.className = 'arrow-bottom';
    } else {
      e.target.className = 'arrow-right';
    }
  }
}
