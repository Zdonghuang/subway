
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  constructor(private http: HttpClient) { }
  updatedImg(obj) {
    return this.http.post(`/auth-center/v2/apps/uploadimage`, obj);
  }
}
