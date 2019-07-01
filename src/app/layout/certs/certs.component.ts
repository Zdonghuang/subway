import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Cert } from '../../model/cert';
import { CertService } from '../../services/cert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss'],
  animations: [routerTransition()]
})
export class CertsComponent implements OnInit {
  busy = false;
  confirmButtonClass = 'btn btn-info';
  showClose = false;
  popupHeader = '';
  popupBody = '';
  certs: Cert[] = [];

  @ViewChild('content') public content: TemplateRef<any>;

  constructor(public certService: CertService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllCerts();
  }

  getAllCerts() {
    this.busy = true;
    this.certService.getAll().subscribe(
      res => {
        this.busy = false;
        this.certs = res;
      },
      err => {
        this.busy = false;
      }
    );
  }

  showDetail(cert: Cert) {
    this.showClose = true;
    this.popupHeader = cert.name;
    this.popupBody = '';
    this.certService.get(cert.filename).subscribe(
      res => {
        this.popupBody = JSON.stringify(JSON.parse(res), null, 2);
      }
    );
    this.modalService.open(this.content, { size: 'sm' });
  }

  delete(cert: Cert) {
    this.showClose = false;
    this.popupHeader = 'Warning';
    this.popupBody = 'Are you sure to delete the certificate?';

    this.modalService.open(this.content, { size: 'sm' }).result.then(
      (result) => {
      },
      (reason) => {
        console.log(reason);
        if (reason === 'OK') {
          this.certService.delete(cert.filename).subscribe(
            res => {
              this.getAllCerts();
            }
          );
        }
      }
    );
  }
}
