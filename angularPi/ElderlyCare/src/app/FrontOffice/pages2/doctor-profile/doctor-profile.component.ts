
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorProfileService } from '../../services2/doctor-profile.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctorId!: number;
  doctor: any;
  elderlyId: number; // Add this line


  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorProfileService,
    private router: Router // Add Router to constructor

  ) { }

  ngOnInit(): void {
    // Extract doctorId from the route parameters
    this.route.params.subscribe(params => {

      this.doctorId = +params['id']; // '+' converts string to number
      this.elderlyId = +params['elderlyId']; // Add this line

      this.loadDoctorProfile();
    });
  }

  loadDoctorProfile() {
    this.doctorService.getDoctorProfile(this.doctorId).subscribe(
      (data: any) => {
        this.doctor = data;
      }
    );
  }

  navigateToDoctorCalendar() {
    if (this.doctorId && this.elderlyId) {
      this.doctorService.getCalendarIdByDoctorId(this.doctorId).subscribe(
        (calendarId: number) => {
          this.router.navigate(['/doctor-calendar', this.doctorId, this.elderlyId], {
            queryParams: { calendarId: calendarId },
          });
        },
        (error) => {
          console.error('Error fetching calendarId:', error);
        }
      );
    }
  }}