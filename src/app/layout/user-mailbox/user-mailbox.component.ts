import { UserMailboxService } from './user-mailbox.service';
import { Component, OnInit } from '@angular/core';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-user-mailbox',
  templateUrl: './user-mailbox.component.html',
  styleUrls: ['./user-mailbox.component.scss']
})
export class UserMailboxComponent implements OnInit {
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  pageNum = 1;
  pageSize = 10;
  enabled = 1;
  order = 'asc';
  orderBy = 'id';
  email = '';
  totalList = [];
  show = false;
  mailList;
  num;
  next;
  count;
  text;
  showtext = false;
  prev = false;
  constructor(private http: UserMailboxService) { }

  ngOnInit() {
    this.getmaillist();
  }
  getmaillist() {
    this.http.getMailList({'email': this.email, 'enabled': this.enabled, 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'order': this.order, 'orderBy': this.orderBy})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.show = true;
        this.next = true;
        this.count = res.result.count;
        this.num = Math.ceil(res.result.count / this.pageSize);
        this.mailList = res.result.emailList;
        if (this.num > 9) {
          if (!this.totalList.length) {
            this.prev = true;
            for (let i = 1 ; i <= 10 ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'actives'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
          }
        } else {
          this.prev = false;
          if (!this.totalList.length) {
            for (let i = 1 ; i <= this.num ; i++) {
              if (i === 1) {
                this.totalList.push({num: i, stylename: 'actives'});
              } else {
                this.totalList.push({num: i, stylename: ''});
              }
            }
          }
        }
      }
    });
  }
  delmail(id, email) {
    if (confirm(`你确定要删除${email}吗`)) {
      this.http.delMail(id)
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '删除成功!';
          this.showtext = true;
          this.getmaillist();
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
        }
      });
    }
  }
  logindex(e) {
    if (this.num < 10) {
      if (this.next && e.target.nodeName === 'LI') {
        this.next = false;
        for (let i = 0 ; i <= this.totalList.length - 1 ; i++) {
          this.totalList[i].stylename = '';
        }
        this.totalList[Number(e.target.innerHTML) - 1].stylename = 'actives';
        this.pageNum = Number(e.target.innerHTML);
        this.getmaillist();
      }
    } else {
      if (e.target.nodeName === 'LI' && this.next) {
        this.next = false;
        if (this.pageNum === this.num && (e.target.innerHTML === '»')) {
          this.getmaillist();
          return;
        } else if ((e.target.innerHTML === '«')) {
          const li = document.getElementsByClassName('actives')[0];
          const firstnum = Number(document.getElementsByClassName('page')[0].children[1].innerHTML);
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
          if (firstnum === Number(li.innerHTML) && lastnum > 10) {
            li.className = '';
            this.pageNum = Number(li.innerHTML) - 1;
            this.totalList.unshift({num: this.pageNum, stylename: 'actives'});
            this.totalList.pop();
          } else if (this.pageNum > 1) {
            li.className = '';
            this.pageNum = Number(li.innerHTML) - 1;
            li.previousElementSibling.className = 'actives';
          }
        } else if (e.target.innerHTML === '»') {
          const li = document.getElementsByClassName('actives')[0];
          const lastnum = Number(document.getElementsByClassName('page')[0].children[10].innerHTML);
          if (this.pageNum < 10) {
            li.className = '';
            this.pageNum = Number(li.innerHTML) + 1;
            li.nextElementSibling.className = 'actives';
          } else if (this.pageNum < this.num && this.pageNum === lastnum) {
            li.className = '';
            this.pageNum = this.pageNum + 1;
            this.totalList.shift();
            this.totalList.push({num: this.pageNum, stylename: 'actives'});
          } else {
            li.className = '';
            this.pageNum = Number(li.innerHTML) + 1;
            li.nextElementSibling.className = 'actives';
          }
        } else {
          const lis = document.getElementsByClassName('page')[0].children;
          for (let i = 1 ; i < lis.length - 1 ; i++) {
            lis[i].className = '';
          }
          e.target.className = 'actives';
          this.pageNum = Number(e.target.innerHTML);
        }
        this.getmaillist();
        const liss = document.getElementsByClassName('page')[0].children;
        if (this.pageNum !== 1) {
          liss[0].className = 'prev';
        } else {
          liss[0].className = 'prev prevv';
        }
        if (this.pageNum !== this.num) {
          liss[liss.length - 1].className = 'next';
        } else {
          liss[liss.length - 1].className = 'next prevv';
        }
      }
    }
  }
  setorder(e) {
    this.pageSize = Number(e.target.value);
    this.pageNum = 1;
    this.totalList = [];
    this.getmaillist();
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
        e.target.download = 'Leez订阅邮箱列表.xls';
  }
}
