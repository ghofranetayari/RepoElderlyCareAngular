import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorId!: number; // This should be set when the user logs in or during application initialization

  setDoctorId(id: number): void {
    this.doctorId = id;
  }

  getDoctorId(): number {
    return this.doctorId;
  }
}