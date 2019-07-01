import { DevContentService } from './dev-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-content',
  templateUrl: './dev-content.component.html',
  styleUrls: ['./dev-content.component.scss']
})
export class DevContentComponent implements OnInit {
  public showlist = false;
  showtext = false;
  text = '';
  leap = localStorage.getItem('leap') ? localStorage.getItem('leap') : 'www.ileapcloud.com';
  emails = false;
  index = true;
  markdown = false;
  register = false;
  Coopertion = false;
  Carousel = false;
  internetPlatform = false;
  intelligentHardware = false;
  intelligentHardwaretext = {
    content: '',
    pt: ''
  };
  none = '';
  useremail;
  internetPlatformtext = {
    pt: '',
    content: ''
  };
  Carouseltext = {
    text: '',
    btntext: '',
    content: ''
  };
  Coopertiontext = '';
  marktext = '';
  registertext = '';
  anapi = '';
  api = false;
  email = {image: '', html: ''};
  emailadmin;
  content = {
    nav: [],
    title: [],
    logo: '',
    clogo: '',
    wxm: '',
    wxq: '',
    lt: '',
    sy: '',
    hz: [],
    js: [],
    db: [],
    conone: [],
    oneimg: '',
    onebgimg: '',
    contwo: [],
    twoimg: '',
    twobgimg: '',
    conthree: [],
    threeimg: '',
    confour: [],
    fourimg: '',
    confive: [],
    fiveimg: '',
    consix: [],
    siximg: '',
    conseven: [],
    sevenimg: '',
    coneight: [],
    eightimg: '',
    consone: [],
    nineimg: '',
    constwo: [],
    tenimg: '',
    consthree: [],
    oneimgs: '',
    twoimgs: '',
    threeimgs: '',
    onebgimgs: '',
    twobgimgs: '',
    threebgimgs: '',
    consfour: [],
    consfive: [],
  };

  constructor(private http: DevContentService) { }

  ngOnInit() {
    this.getemail();
    this.getemailadmin();
    this.getdevinfo();
    this.getmarkdown();
    this.getregister();
    this.getCoopertion();
    this.getCarousel();
    this.getinternetPlatform();
    this.getintelligentHardware();
    this.getadmin();
  }
  getemail() {
    this.http.getEmail()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.email = res.result;
      }
    });
  }
  updateEmail() {
    const email = JSON.stringify(this.email);
    this.http.updateEmail({value: email})
    .subscribe(res =>　{
      if (res.status === 'ok') {
        this.text = '修改成功!';
        this.showtext = true;
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      } else {
        this.text = '修改失败!';
        this.showtext = true;
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      }
    });
  }
  emailImage(e) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const domain = localStorage.getItem('domain');
      this.http.emailImg(domain, formData)
      .subscribe((data) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          this.email.image = `https://${this.leap}/images/${data.result}`;
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
  getdevinfo() {
    this.http.getDevInfo()
    .subscribe(res => {
      if (res.status === 'ok') {
        this.content = JSON.parse(res.result.value);
      }
    });
  }
  addapi() {
    this.api = false;
    this.http.addApi({key: this.anapi, value: ''})
    .subscribe(res => {
      if (res.status === 'ok') {
        this.text = '添加成功!';
        this.showtext = true;
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
  getmarkdown() {
    this.http.getMarkDown()
    .subscribe(res => {
      this.marktext = JSON.parse(res.result.value);
    });
  }
  getregister() {
    this.http.getRegister()
    .subscribe(res => {
      this.registertext = JSON.parse(res.result.value);
    });
  }
  getinternetPlatform() {
    this.http.getInternetPlatform()
    .subscribe(res => {
      this.internetPlatformtext = JSON.parse(res.result.value);
    });
  }
  getintelligentHardware() {
    this.http.getIntelligentHardware()
    .subscribe(res => {
      this.intelligentHardwaretext = JSON.parse(res.result.value);
    });
  }
  getCoopertion() {
    this.http.getCoopertion()
    .subscribe(res => {
      this.Coopertiontext = JSON.parse(res.result.value);
    });
  }
  getCarousel() {
    this.http.getCarousel()
    .subscribe(res => {
      this.Carouseltext = JSON.parse(res.result.value);
    });
  }
  getemailadmin() {
    this.http.getEmailAdmin()
    .subscribe(res => {
      this.emailadmin = JSON.parse(res.result.value);
    });
  }
  getadmin() {
    this.http.getAdmin()
    .subscribe(res => {
      this.useremail = res.result.value;
    });
  }
  upcontent(cal) {
    if (cal === 'index') {
      const content = JSON.stringify(this.content);
      this.updata('indexinfokey', content);
    }
    if (cal === 'markdown') {
      const content = JSON.stringify(this.marktext);
      this.updata('markdown', content);
    }
    if (cal === 'register') {
      const content = JSON.stringify(this.registertext);
      this.updata('register', content);
    }
    if (cal === 'Coopertion') {
      const content = JSON.stringify(this.Coopertiontext);
      this.updata('Coopertion', content);
    }
    if (cal === 'Carousel') {
      const content = JSON.stringify(this.Carouseltext);
      this.updata('Carousel', content);
    }
    if (cal === 'internetPlatform') {
      const content = JSON.stringify(this.internetPlatformtext);
      this.updata('internetPlatform', content);
    }
    if (cal === 'intelligentHardware') {
      const content = JSON.stringify(this.intelligentHardwaretext);
      this.updata('intelligentHardware', content);
    }
    if (cal === 'emailadmin') {
      const content = JSON.stringify(this.emailadmin);
      this.updata('emailForAdminconfig', content);
    }
    if (cal === 'useremail') {
      const content = this.useremail;
      this.updata('emailForAdminconfig_user', content);
    }
  }
  updata(key, val) {
    this.http.updated(key, {key: key, value: val})
      .subscribe(res => {
        if (res.status === 'ok') {
          this.text = '修改成功!';
          this.showtext = true;
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
  logoimage(e, num) {
    if (e.target.files[0].type.indexOf('image') !== -1) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const domain = localStorage.getItem('domain');
      this.http.emailImg(domain, formData)
      .subscribe((data) => {
        if (data.status === 'ok') {
          this.text = '上传图片成功!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1000);
          const image = `https://${this.leap}/images/${data.result}`;
          const arr = [
            'logo', 'clogo', 'wxm', 'wxq', 'oneimg', 'twoimg', 'threeimg', 'fourimg',
            'fiveimg', 'siximg', 'sevenimg', 'eightimg', 'nineimg', 'tenimg', 'oneimgs',
            'twoimgs', 'threeimgs', 'onebgimgs', 'twobgimgs', 'threebgimgs', 'onebgimg',
            'twobgimg'
          ];
          for (let i = 1; i <= arr.length; i++) {
            if (Number(num) === i) {
              this.content[arr[i - 1]] = image;
            }
          }
          if (Number(num) === 23) {
            this.none = image;
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
  setactive(cal, e) {
    const arr = [
      'index',
      'emails',
      'markdown',
      'register',
      'Carousel',
      'Coopertion',
      'internetPlatform',
      'intelligentHardware'
    ];
    for (let i = 0; i < arr.length; i++) {
      this[arr[i]] = false;
    }
    this[cal] = true;
    if (e.target.nodeName === 'LI') {
      const lis = document.getElementsByClassName('list')[0].children;
      for (let i = 0 ; i < lis.length ; i++) {
        lis[i].className = '';
      }
      e.target.className = 'active';
    }
  }
}
