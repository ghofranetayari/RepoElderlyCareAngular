import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from '../../services2/calendar.service';
import { Appointment } from '../../entities/appointment.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-doctor',
  templateUrl: './calendar-doctor.component.html',
  styleUrls: ['./calendar-doctor.component.css']
})
export class CalendarDoctorComponent implements OnInit {
  doctorId: number; // Add this line
  calendarId: number; // Add this line

  calendarVisible = true;
  currentEvents: EventApi[] = [];
  ///////////////////////////////////////////////////////
  pendingEvents: EventApi[] = [];
///////////////////////////////////////////////////////////
approvedEvents: EventApi[] = [];
completedEvents: EventApi[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: false, // Set to false to disable drag-and-drop
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  constructor(
    private calendarService: CalendarService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id']; // Add this line
      this.calendarId = +this.route.snapshot.queryParams['calendarId'];

      this.loadAppointments();
      this.loadPendingAppointments(); // Add this line
      this.loadApprovedAppointments(); // Add this line
      this.loadCompletedAppointments(); // Add this line


    });
  }

loadAppointments() {
    // Check if calendarId is a valid number before making the request
    if (!isNaN(this.calendarId) && this.calendarId > 0) {
      this.calendarService.getAppointmentsByCalendarId(this.calendarId).subscribe(
        (appointments: Appointment[]) => {
          this.updateCalendarEvents(appointments);
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    } else {
      console.error('Invalid calendarId:', this.calendarId);
    }
  }
  updateCalendarEvents(appointments: Appointment[]) {
    const approvedAppointments = appointments.filter(appointment => appointment.appStatus === 'APPROVED');
    const events: EventInput[] = approvedAppointments.map((appointment) => ({
      id: appointment.idAppointment.toString(),
      title: appointment.patientName,
      start: new Date(appointment.appFrom),
      end: new Date(appointment.appTo),
    }));

    // Set the events to the FullCalendar
    this.currentEvents = events as EventApi[];
    this.calendarOptions.events = events;
    this.changeDetector.detectChanges();
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleEventClick(clickInfo: EventClickArg) {
    // Handle event click if needed
    console.log('Event clicked:', clickInfo);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  
  loadPendingAppointments() {
    if (!isNaN(this.calendarId) && this.calendarId > 0) {
      this.calendarService.getPendingAppointmentsByCalendarId(this.calendarId).subscribe(
        (pendingAppointments: Appointment[]) => {
          this.updatePendingAppointments(pendingAppointments);
        },
        (error) => {
          console.error('Error fetching pending appointments:', error);
        }
      );
    } else {
      console.error('Invalid calendarId:', this.calendarId);
    }
  }
  loadCompletedAppointments() {
    if (!isNaN(this.calendarId) && this.calendarId > 0) {
      this.calendarService.getCompletedAppointmentsByCalendarId(this.calendarId).subscribe(
        (completedAppointments: Appointment[]) => {
          this.updateCompletedAppointments(completedAppointments);
        },
        (error) => {
          console.error('Error fetching completed appointments:', error);
        }
      );
    } else {
      console.error('Invalid calendarId:', this.calendarId);
    }
  }




  loadApprovedAppointments() {
    if (!isNaN(this.calendarId) && this.calendarId > 0) {
      this.calendarService.getApprovedAppointmentsByCalendarId(this.calendarId).subscribe(
        (approvedAppointments: Appointment[]) => {
          this.updateApprovedAppointments(approvedAppointments);
        },
        (error) => {
          console.error('Error fetching approved appointments:', error);
        }
      );
    } else {
      console.error('Invalid calendarId:', this.calendarId);
    }
  }
  updatePendingAppointments(pendingAppointments: Appointment[]) {
    console.log('Pending Appointments:', pendingAppointments);


    const events: EventInput[] = pendingAppointments.map((appointment) => ({
      id: appointment.idAppointment.toString(),
      title: appointment.patientName,
      start: new Date(appointment.appFrom),
      end: new Date(appointment.appTo),
    }));
    this.pendingEvents = events as EventApi[];
    this.changeDetector.detectChanges();
  }
  
  
  
  updateCompletedAppointments(completedAppointments: Appointment[]) {
    console.log('Completed Appointments:', completedAppointments);


    const events: EventInput[] = completedAppointments.map((appointment) => ({
      id: appointment.idAppointment.toString(),
      title: appointment.patientName,
      start: new Date(appointment.appFrom),
      end: new Date(appointment.appTo),
    }));
    this.completedEvents = events as EventApi[];
    this.changeDetector.detectChanges();
  }
  
  
  
  
  
  
  
  
  
  
  updateApprovedAppointments(approvedAppointments: Appointment[]) {
    console.log('Approved Appointments:', approvedAppointments);


    const events: EventInput[] = approvedAppointments.map((appointment) => ({
      id: appointment.idAppointment.toString(),
      title: appointment.patientName,
      start: new Date(appointment.appFrom),
      end: new Date(appointment.appTo),
    }));
    // Set the events to the FullCalendar
    this.approvedEvents = events as EventApi[];
    this.changeDetector.detectChanges();
  }

  approveAppointment(appointmentId: number) {
    const isConfirmed = window.confirm('Are you sure you want to approve this appointment?');
  
    if (isConfirmed) {
      this.calendarService.approveAppointment(appointmentId).subscribe(
        () => {
          // Update the list of pending appointments after approval
          this.loadPendingAppointments();
          this.loadApprovedAppointments();
         window.location.reload();

        },
        (error) => {
          console.error('Error approving appointment:', error);
        }
      );
    }
  }
  
  rejectAppointment(appointmentId: number) {
    const isConfirmed = window.confirm('Are you sure you want to reject this appointment?');
  
    if (isConfirmed) {
      this.calendarService.rejectAppointment(appointmentId).subscribe(
        () => {
          // Update the list of pending appointments after rejection
          this.loadPendingAppointments();
          this.loadApprovedAppointments();
        },
        (error) => {
          console.error('Error rejecting appointment:', error);
        }
      );
    }
  }
  completeAppointment(appointmentId: number) {
    const isConfirmed = window.confirm('Are you sure you want to Mark this appointment As Done?');
  
    if (isConfirmed) {
      this.calendarService.completeAppointment(appointmentId).subscribe(
        () => {
          // Update the list of pending appointments after completion
          this.loadPendingAppointments();
          this.loadApprovedAppointments();
              window.location.reload();

        },
        (error) => {
          console.error('Error completing appointment:', error);
        }
      );
    }
  }
  
}
