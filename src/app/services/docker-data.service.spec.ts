import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DockerDataService } from './docker-data.service';

describe('DockerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DockerDataService]
    });
  });

  it('should be created', inject([DockerDataService], (service: DockerDataService) => {
    expect(service).toBeTruthy();
  }));
});
