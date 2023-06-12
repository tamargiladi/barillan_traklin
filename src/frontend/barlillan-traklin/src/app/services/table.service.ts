import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }


  getAllFaculties() {
    return this.httpClient.get('https://v1.nocodeapi.com/tamargi/google_sheets/JeVDzRGKhnBGYywz', {params:{tabId:'Sheet1'}});
  }
}
