import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private httpClient: HttpClient) {}

  params = { tabId: '06/07' };

  getAllFaculties(): Observable<any> {
    return this.httpClient.get(
      'https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz',
      { params: this.params }
    );
  }

  updateRow(name: string, no: number, faculty: number): Observable<any> {
    return this.httpClient.put(
      'https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz',
      { row_id: faculty, [`Participant_no_${no}`]: name },
      { params: this.params }
    );
  }
}
