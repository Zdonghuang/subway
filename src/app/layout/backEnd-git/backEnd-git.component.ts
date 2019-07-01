import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BackendGitService } from './backEnd-git.service';
import { observable, Subscriber } from 'rxjs';
import { resolve } from 'path';
@Component({
    selector: 'app-backEnd-git',
    templateUrl: './backEnd-git.component.html',
    styleUrls: ['./backEnd-git.component.scss'],
    animations: [routerTransition()]
})
export class BackendGitComponent implements OnInit {
    gitList;
    busy = true;
    showtext = false;
    text = '';
    constructor(public http: BackendGitService) {}

    ngOnInit() {
      this.getGitList();
    }
    getGitList() {
      this.http.getGitList()
      .subscribe(res => {
        if (res.status === 'ok') {
          this.busy = false;
          this.gitList = res.result;
        }
      });
    }
    getAgit(e, n) {
      this.http.getAgit(n).subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/vnd.ms-excel'
        });
        const objectUrl = URL.createObjectURL(blob);
        e.target.href = objectUrl;
        e.target.download = n;
      });
    }
    updateGit(n) {
      const file = document.getElementsByClassName('file')[0] as HTMLInputElement;
      file.click();
      file.onchange = () => {
        if (file.files[0].name === n) {
          const formData = new FormData();
          formData.append('fileName', n);
          formData.append('commitMessage', '更新');
          formData.append('file', file.files[0]);
          this.http.updateGit(formData)
          .subscribe(res => {
            if (res.status === 'ok') {
              this.text = '更新成功';
              this.showtext = true;
              setTimeout(() => {
                this.text = '';
                this.showtext = false;
              }, 2000);
            } else {
              this.text = '更新失败';
              this.showtext = true;
              setTimeout(() => {
                this.text = '';
                this.showtext = false;
              }, 2000);
            }
          });
        } else {
          this.text = '文件不匹配';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 2000);
        }
      };
    }
}
