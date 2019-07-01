import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SidebarService } from './sidebar.service';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    app = false;
    user = false;
    rights = false;
    api = false;
    dev = false;
    back = false;
    dockerState = false;
    dockerList = false;
    services = false;
    dash = false;
    mailbox = false;
    arr = [];
    leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router, private http: SidebarService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.getToken();
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    getToken() {
      this.http.getpath()
              .subscribe(res => {
                if (res.status === 'ok') {
                  for (const key in res.result) {
                    if (res.result.hasOwnProperty(key) && res.result[key]) {
                      if (key === '1') {
                        sessionStorage.setItem('show', 'show');
                      } else {
                        sessionStorage.setItem('show', '');
                      }
                      this.arr = res.result[key];
                    }
                  }
                  if (this.arr.indexOf('review-app') !== -1) {
                    this.app = true;
                  }
                  if (this.arr.indexOf('user-list') !== -1) {
                    this.user = true;
                  }
                  if (this.arr.indexOf('user-rights') !== -1) {
                    this.rights = true;
                  }
                  if (this.arr.indexOf('api-list') !== -1) {
                    this.api = true;
                  }
                  if (this.arr.indexOf('dev-content') !== -1) {
                    this.dev = true;
                  }
                  if (this.arr.indexOf('back-management') !== -1) {
                    this.back = true;
                  }
                  if (this.arr.indexOf('docker-state') !== -1) {
                    this.dockerState = true;
                  }
                  if (this.arr.indexOf('docker-list') !== -1) {
                    this.dockerList = true;
                  }
                  if (this.arr.indexOf('services') !== -1) {
                    this.services = true;
                  }
                  if (this.arr.indexOf('user-dashboard') !== -1) {
                    this.dash = true;
                  }
                  if (this.arr.indexOf('user-mailbox') !== -1) {
                    this.mailbox = true;
                  }
                } else {
                  this.router.navigate(['/login']);
                }
              }, error => {
              });
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
