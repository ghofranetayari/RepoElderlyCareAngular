
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorCalendarDTO } from '../entities/doctor-calendar.dto';
import { Appointment } from '../entities/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'http://localhost:9091'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getDoctorCalendar(doctorId: number, elderlyId: number): Observable<DoctorCalendarDTO> {
    const url = `${this.baseUrl}/Doctor/${doctorId}/${elderlyId}/calendar`;
    return this.http.get<DoctorCalendarDTO>(url);
  }
  getPendingAppointments(doctorId: number): Observable<Appointment[]> {
    const url = `${this.baseUrl}/appointments/pending/${doctorId}`;
    return this.http.get<Appointment[]>(url);
}
saveAppointmentService(appointmentData: any, elderlyId: number, calendarId: number): Observable<any> {
  const url = `${this.baseUrl}/appointments/AddApp/${elderlyId}/${calendarId}`;
  return this.http.put(url, appointmentData);
}
getAllAppointments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/appointments`);
}
getAppointmentsByCalendarId(calendarId: number): Observable<Appointment[]> {
  const url = `${this.baseUrl}/appointments/${calendarId}/calappointments`;
  return this.http.get<Appointment[]>(url);
}


getCompletedAppointmentsByCalendarId(calendarId: number): Observable<Appointment[]> {
  const url = `${this.baseUrl}/appointments/${calendarId}/completed-appointments`;
  return this.http.get<Appointment[]>(url);
}




getPendingAppointmentsByCalendarId(calendarId: number): Observable<Appointment[]> {
  const url = `${this.baseUrl}/appointments/${calendarId}/pending-appointments`;
  return this.http.get<Appointment[]>(url);
}


getApprovedAppointmentsByCalendarId(calendarId: number): Observable<Appointment[]> {
  const url = `${this.baseUrl}/appointments/${calendarId}/approved-appointments`;
  return this.http.get<Appointment[]>(url);
}




approveAppointment(appointmentId: number): Observable<any> {
  const endpoint = `${this.baseUrl}/Doctor/approve-appointment/${appointmentId}`;
  return this.http.put(endpoint, null, { responseType: 'text' });
}
rejectAppointment(appointmentId: number): Observable<any> {
  const endpoint = `${this.baseUrl}/appointments/markRejected?appointmentId=${appointmentId}`;
  return this.http.get(endpoint, { responseType: 'text' });
}
completeAppointment(appointmentId: number): Observable<any> {
  const endpoint = `${this.baseUrl}/Doctor/complete-appointment/${appointmentId}`;
  return this.http.put(endpoint, null, { responseType: 'text' });
}

getPendingAppointmentsByElderlyId(elderlyId: number) {
  const url = `${this.baseUrl}/appointments/${elderlyId}/pending-appointmentsElderly`;
  return this.http.get<Appointment[]>(url);
}
getCompletedAppointmentsByElderlyId(elderlyId: number) {
  const url = `${this.baseUrl}/appointments/${elderlyId}/completed-appointmentsElderly`;
  return this.http.get<Appointment[]>(url);
}

getRejectedAppointmentsByElderlyId(elderlyId: number) {
  const url = `${this.baseUrl}/appointments/${elderlyId}/rejected-appointmentsElderly`;
  return this.http.get<Appointment[]>(url);
}

cancelAppointment(id: number): Observable<void> {
  const url = `${this.baseUrl}/appointments/DeleteApp/${id}`;
  return this.http.delete<void>(url);
}

getAppointmentById(appointmentId: number): Observable<Appointment> {
  const url = `${this.baseUrl}/appointments/GetAppDetails/${appointmentId}`;
  return this.http.get<Appointment>(url);
}
updateAppointment(id: number, data: any): Observable<void> {
  const url = `${this.baseUrl}/appointments/UpdateApp/${id}`;
  return this.http.put<void>(url, data);
}
getDoctorPatients(doctorId: number): Observable<any> {
  const url = `${this.baseUrl}/Doctor/doctoratients/${doctorId}`;
  return this.http.get(url);
}
}