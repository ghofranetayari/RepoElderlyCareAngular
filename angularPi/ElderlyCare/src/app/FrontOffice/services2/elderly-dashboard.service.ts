
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElderlyDashboardService {
  private baseUrl = 'http://localhost:9091'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  /*searchDoctors(specialty: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctor/search/${specialty}`);
  }*/
  
  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctor`);
  }
  searchDoctors(specialty: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctor/search/${specialty}`);
  } 
}