import { Component, OnInit } from '@angular/core';
import { ElderlyDashboardService } from '../../services2/elderly-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorProfileService } from '../../services2/doctor-profile.service';

@Component({
  selector: 'app-elderly-dashboard',
  templateUrl: './elderly-dashboard.component.html',
  styleUrls: ['./elderly-dashboard.component.css']
})
export class ElderlyDashboardComponent implements OnInit {
  searchSpecialty: string = '';
  doctors: any[] = [];
  elderlyId: number;
  doctorId!: number;

  constructor(private elderlyService: ElderlyDashboardService,
     private router: Router,
     private route: ActivatedRoute,
     private doctorService: DoctorProfileService,

          ) { }

     ngOnInit(): void {
      // Extract both doctorId and elderlyId from the route parameters
      this.route.params.subscribe(params => {
        this.elderlyId = +params['elderlyId']; // Add this line
        console.log('ngElderly ID:', this.elderlyId);
        this.getDoctors();

      });
    }

   /*
    searchDoctors() {
      this.elderlyService.searchDoctors(this.searchSpecialty).subscribe(
        (data: any[]) => {
          this.doctors = data;
          console.log('Doctors Array:', this.doctors);
        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
    }*/

    searchDoctors(): void {
      if (this.searchSpecialty.trim() === '') {
        // If search term is empty, fetch all doctors
        this.getDoctors();
      } else {
        // Search doctors based on the search term
        this.elderlyService.searchDoctors(this.searchSpecialty)
          .subscribe(
            (doctors: any[]) => {
              this.doctors = doctors;
            },
            (error) => {
              console.error('Error searching doctors: ', error);
            }
          );
      }
    }
      
  
  navigateToDoctorProfile(doctorId: number) {
   if (typeof doctorId === 'number') {
      console.log('Doctor ID:', doctorId);
  
      const elderlyId = this.elderlyId ;
      console.log('elderly ID:', elderlyId);

      this.router.navigate(['/doctor-profile', doctorId, elderlyId]);
    } else {
      console.error('Invalid Doctor ID:', doctorId);
    }
   }

   private getDoctors() {
    this.elderlyService.getDoctors().subscribe(
      (data: any[]) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
}  