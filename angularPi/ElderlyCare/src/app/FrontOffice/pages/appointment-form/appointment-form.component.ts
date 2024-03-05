import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../services2/shared.service';
import { CalendarService } from '../../services2/calendar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  calendarId: number; // Add this line

  elderlyId: number; 
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  appointmentForm: FormGroup;

  constructor(
    private route:ActivatedRoute,
    private calendarService: CalendarService,
    private dataSharingService: SharedService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentFormComponent>,

    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetector: ChangeDetectorRef
  ) {
    this.appointmentForm = this.formBuilder.group({
      patientName: [''],
      appFrom: [''],
      appTo: [''],
      appFirst: [false], // Default to false
      symptom: ['']
    });

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('ppppp',params,this.elderlyId,this.calendarId); // Log the parameters to see if 'elderlyId' is present

      this.elderlyId = +params['elderlyId']; // Add this line
      this.calendarId = +this.route.snapshot.queryParams['calendarId'];

    });
  }
  




  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
  
      // Call the service endpoint method here
      this.calendarService.saveAppointmentService(formData,this.elderlyId , this.calendarId).subscribe(
        response => {
          console.log('Appointment saved successfully:', response);
          // Close the dialog or perform other actions
          this.dialogRef.close();
        },
        error => {
          console.error('Error saving appointment:', error);
          // Handle error if needed
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }
  
  onButtonClicked(): void {
    //works
    console.log('Form values before submit:', this.appointmentForm.value);

    this.dataSharingService.triggerOnSubmit();
  }
  
}
