import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cert, CertDetail } from '../model/cert';

@Injectable({
  providedIn: 'root'
})
export class CertService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Cert[]> {
    return this.http.get<Cert[]>('/ciot/scepForAdmin/list').pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        const certs: Cert[] = [];
        for (const key in res.result) {
          if (res.result.hasOwnProperty(key)) {
            certs.push({
              name: key,
              filename: res.result[key]
            });
          }
        }
        return certs;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  get(filename: string): Observable<string> {
    return this.http.get<string>(`/ciot/scepForAdmin/getInfo/${filename}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }
        return res.result;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  delete(filename: string): Observable<boolean> {
    return this.http.delete<boolean>(`/ciot/scepForAdmin/delete/${filename}`).pipe(
      map((res: any) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }
        return res.result.toLowerCase() === 'success';
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }
}
