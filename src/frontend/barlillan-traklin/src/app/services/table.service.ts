import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private httpClient: HttpClient) {}

  params = { tabId: 'Updated' };

  getAllFaculties(): Observable<any> {
    return this.httpClient.get(
      'https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz',
      { params: this.params }
    );
  }

  addRow(a: [string[]]): Observable<any> {
    return this.httpClient.post(
      'https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz',
     a,
      { params: this.params }
    );
  }

  getAllDates(): Observable<any> {
    return this.httpClient.get('https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz?tabId=Dates').pipe(map((items: any)=>{
      return items.data.map((item: any)=> {
        const { row_id, ...rest} = item;
        return rest;
      })
    }))
  }
}
