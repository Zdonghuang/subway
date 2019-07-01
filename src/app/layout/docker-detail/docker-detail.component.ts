import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { DockerDataService } from '../../services/docker-data.service';
import { ContainerDetail } from '../../model/container-detail';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'app-docker-detail',
  templateUrl: './docker-detail.component.html',
  styleUrls: ['./docker-detail.component.scss'],
  animations: [routerTransition()]
})
export class DockerDetailComponent implements OnInit {
  busy = false;
  id = '';
  container = new ContainerDetail;
  stdout = '';
  stderr = '';
  message = '';
  processType = 'info';
  processMessage = '';
  processing = false;
  alertMessage = '';
  confirmButtonClass = 'btn btn-info';

  @ViewChild('content') public content: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dockerDataService: DockerDataService,
    private modalService: NgbModal) {
    }

  ngOnInit() {
    window.scroll(0, 0);
    this.busy = true;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.dockerDataService.getContainerById(this.id)
        .subscribe((data: any) => {
          this.container.id = data.Id;
          this.container.name = data.Name;
          this.container.created = data.Created;
          this.container.state = JSON.stringify(data.State);
          this.container.mounts = JSON.stringify(data.Mounts);
          this.container.environment = data.Config.Env;
          this.container.command = data.Config.Cmd;
          this.container.workingDirectory = data.Config.WorkingDir;
          this.container.ip = data.NetworkSettings.IPAddress;
          this.container.ports = JSON.stringify(data.NetworkSettings.Ports);

          this.busy = false;
        });
    });
  }

  GetStdout() {
    this.dockerDataService.getStdoutById(this.id)
    .subscribe((data: string) => {
      this.stdout = data;
    });
  }

  GetStderr() {
    this.dockerDataService.getStderrById(this.id)
    .subscribe((data: string) => {
      this.stderr = data;
    });
  }

  Kill() {
    this.alertMessage = 'Warning - Kill';
    this.confirmButtonClass = 'btn btn-danger';

    this.modalService.open(this.content, { size: 'sm' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
      if (reason === 'OK') {
        this.processMessage = 'killing...';
        this.processType = 'danger';
        this.processing = true;

        setTimeout(() => {
          this.processing = false;
        }, 3000);

        this.dockerDataService.killContainer(this.id).subscribe();
      }
    });
  }

  Stop() {
    this.alertMessage = 'Warning - Stop';
    this.confirmButtonClass = 'btn btn-warning';

    this.modalService.open(this.content, { size: 'sm' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
      if (reason === 'OK') {
        this.processMessage = 'stopping...';
        this.processType = 'warning';
        this.processing = true;

        setTimeout(() => {
          this.processing = false;
        }, 8000);

        this.dockerDataService.stopContainer(this.id).subscribe();
      }
    });
  }

  Start() {
    this.alertMessage = 'Warning - Start';
    this.confirmButtonClass = 'btn btn-success';

    this.modalService.open(this.content, { size: 'sm' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
      if (reason === 'OK') {
        this.processMessage = 'starting...';
        this.processType = 'success';
        this.processing = true;

        setTimeout(() => {
          this.processing = false;
        }, 8000);

        this.dockerDataService.startContainer(this.id).subscribe();
      }
    });
  }

  Restart() {
    this.alertMessage = 'Warning - Restart';
    this.confirmButtonClass = 'btn btn-info';

    this.modalService.open(this.content, { size: 'sm' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
      if (reason === 'OK') {
        this.processMessage = 'restarting...';
        this.processType = 'info';
        this.processing = true;

        setTimeout(() => {
          this.processing = false;
        }, 13000);

        this.dockerDataService.restartContainer(this.id).subscribe();
      }
    });
  }
}
