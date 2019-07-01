import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    busy = false;
    internet = '';
    domain = localStorage.getItem('domain') ? localStorage.getItem('domain') : 'iLeapCloud';
    public logindatas = {
      username: '',
      password: '',
      vcode: '',
      clientid: `${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}`
    };
    public tips = '';
    public src = this.http.getCode(this.logindatas.clientid);
    constructor(private http: LoginService, private translate: TranslateService, public router: Router
      , private https: HttpClient) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'zh-CHS');
    }
    math() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    changePic() {
      this.logindatas.clientid =
      `${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}${this.math()}`;
      this.src = this.http.getCode(this.logindatas.clientid);
    }
    onUsername(event: any) {
        this.tips = '';
        this.logindatas.username = event.target.value;
    }
    onPassword(event: any) {
      if (event.target.value.length < 6) {
        this.tips = '请输入正确的密码！';
      } else {
        this.tips = '';
        this.logindatas.password = event.target.value;
      }
    }
    onVcode(event: any) {
      this.logindatas.vcode = event.target.value;
    }
    ngOnInit() {
      this.getinternet();
    }
    getinternet() {
      this.http.getEnvType()
      .subscribe(res => {
        this.internet = res.result;
      });
    }
    onLoggedin() {
      if (this.logindatas.username === '') {
        this.tips = '请输入用户名！';
      } else if (this.logindatas.password === '') {
        this.tips = '请输入密码！';
      } else if (this.logindatas.vcode === '') {
        this.tips = '请输入验证码！';
      } else {
        this.busy = true;
        this.tips = '';
        this.https.post(`https://api.ileapcloud.com/middle-manager/login`, this.logindatas,
        {observe: 'response', responseType: 'text'}).subscribe((data) => {
          this.busy = false;
          if (data.status === 200) {
            if (data.headers.get('authorization')) {
              localStorage.setItem('token', `Bearer ${data.headers.get('authorization')}`);
              this.changePic();
              this.http.getpath()
              .subscribe(res => {
                if (res.status === 'ok') {
                  this.tips = '';
                  localStorage.setItem('username', this.logindatas.username);
                  this.router.navigate(['/user-list']);
                } else if (res.result === 60003) {
                  this.tips = '您没有权限登录';
                }
              }, error => {
                if (error) {
                  this.tips = '登录失败！';
                }
              });
            } else {
              this.changePic();
              switch (Number(data.body)) {
                  case 10010:
                    this.tips = '登陆失败次数超过5次，请10分钟后再试';
                    break;
                  case 10011:
                    this.tips = '用户不存在';
                    break;
                  case 10012:
                    this.tips = '用户名或密码不正确';
                    break;
                  case 10014:
                    this.tips = '图片验证码不正确';
                    break;
                  default:
                    this.tips = '登录失败';
              }
            }
          }
        });
      }
        localStorage.setItem('isLoggedin', 'true');
    }
}
