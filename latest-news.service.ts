import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://newsapi.org/v2/';
@Injectable({
  providedIn: 'root'
})
export class LatestNewsService {

  constructor(private http: HttpClient) { }

  getLatestNews() {
    const todaydate = new Date();
    return this.http.get(`${apiUrl}everything?q=bitcoin&from=${todaydate}&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98`)
    .toPromise();
  }
}
