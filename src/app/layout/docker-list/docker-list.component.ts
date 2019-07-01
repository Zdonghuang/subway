import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DockerDataService } from '../../services/docker-data.service';
import { DockerContainer } from '../../model/docker-container';

@Component({
  selector: 'app-docker-list',
  templateUrl: './docker-list.component.html',
  styleUrls: ['./docker-list.component.scss'],
  animations: [routerTransition()]
})
export class DockerListComponent implements OnInit {
  busy = false;
  containers: DockerContainer[] = [];

  constructor(private dockerDataService: DockerDataService) {
  }

  ngOnInit() {
    this.busy = true;
    this.dockerDataService.getAll()
      .subscribe((data: any[]) => {
        this.containers.length = 0;
        data.forEach(con => {
          this.containers.push(new DockerContainer(con.Id, con.Names[0].slice(1), con.Command, con.State, con.Status));
        });

        this.busy = false;
      });
  }
}
