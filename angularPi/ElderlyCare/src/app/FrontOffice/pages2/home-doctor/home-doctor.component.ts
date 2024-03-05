import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../services2/calendar.service';
import { DoctorService } from 'src/app/services/doctorService';
import { DoctorProfileService } from '../../services2/doctor-profile.service';

@Component({
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css'],
})
export class HomeDoctorComponent  implements OnInit{
  idDoctor: number;
  doctorProfile: any;
  patients: any[] = [];

  constructor(    
    private doctorProfileService: DoctorProfileService,
    private calendarService:CalendarService,
      private router: Router,
       private route: ActivatedRoute) {}


  ngOnInit() {
    // Retrieve idDoctor from the URL
    this.idDoctor = +this.route.snapshot.params['id']; // '+' is used to convert string to number

    // Fetch the doctor's profile using the service
    this.doctorProfileService.getDoctorProfile(this.idDoctor).subscribe(
      (profile) => {
        this.doctorProfile = profile;

        // Assuming the 'name' property is available in the response
        this.doctorProfile.username = `Dr. ${this.doctorProfile.username}`;
        this.fetchDoctorPatients();

      },
      (error) => {
        console.error('Error fetching doctor profile:', error);
        // Handle the error as needed
      }
    );
  }
  onScheduleClick() {
    // Retrieve doctorId from the URL
    const doctorId = this.route.snapshot.params['id'];

    // Fetch the calendarId using the service
    this.doctorProfileService.getCalendarIdByDoctorId(doctorId).subscribe(
      (calendarId) => {
        // Navigate to the calendarDoctor component with the fetched calendarId
        this.router.navigate(['/calendarDoctor', doctorId], { queryParams: { calendarId } });
      },
      (error) => {
        console.error('Error fetching calendarId:', error);
        // Handle the error as needed
      }
    );
  }


    fetchDoctorPatients() {
    this.calendarService.getDoctorPatients(this.idDoctor).subscribe(
      (data: any[]) => {
        this.patients = data;
        console.log("hiii",data);
      },
      (error) => {
        console.error('Error fetching doctor patients:', error);
      }
    );
  }
}