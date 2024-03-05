import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {
  
  private baseUrl = 'http://localhost:9091'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getDoctorProfile(doctorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctor/${doctorId}`);

  }
  getCalendarIdByDoctorId(doctorId: number): Observable<number> {
    const url = `${this.baseUrl}/Calendar/getCalendarIdByDoctor/${doctorId}`;
    return this.http.get<number>(url).pipe(
      tap(calendarId => console.log('Fetched calendarId:', calendarId)),
      catchError(error => {
        console.error('Error fetching calendarId:', error);
        throw error;
      })
    );
  }
  
}