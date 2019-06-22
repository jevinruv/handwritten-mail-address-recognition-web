import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageResult } from '../models/image-result';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  private API_URL = '/api'

  constructor(private http: HttpClient) {
  }

  uploadImage(data) {
    return this.http.post<ImageResult[]>(this.API_URL + '/recognize', data);
  }

  test() {
    return this.http.get(this.API_URL + '/');
  }
}
