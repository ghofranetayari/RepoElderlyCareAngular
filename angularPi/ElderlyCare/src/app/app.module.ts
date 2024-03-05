import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
//import { SidebarFrontComponent } from './FrontOffice/sidebar-front/sidebar-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule, FabModule, SpeedDialModule } from '@syncfusion/ej2-angular-buttons';
import { AccordionModule, ToolbarModule, ContextMenuModule, BreadcrumbModule, CarouselModule, TabModule, TreeViewModule, SidebarModule, MenuModule, AppBarModule, StepperModule } from '@syncfusion/ej2-angular-navigations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentFormComponent } from './FrontOffice/pages/appointment-form/appointment-form.component';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ElderlyDashboardComponent } from './FrontOffice/pages2/elderly-dashboard/elderly-dashboard.component';
import { DoctorProfileComponent } from './FrontOffice/pages2/doctor-profile/doctor-profile.component';
import { CalendarComponent } from './FrontOffice/pages2/calendar/calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PendingAppointmentsComponent } from './FrontOffice/pages2/pending-appointments/pending-appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './FrontOffice/services2/shared.service';
import { CalendarDoctorComponent } from './FrontOffice/pages2/calendar-doctor/calendar-doctor.component';
import { SearchFilterPipe } from './FrontOffice/pages2/search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeDoctorComponent } from './FrontOffice/pages2/home-doctor/home-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
  //  SidebarFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    HomeBackComponent,
    CalendarComponent,
    AppointmentFormComponent,
    ElderlyDashboardComponent,
    DoctorProfileComponent,
    PendingAppointmentsComponent,
    CalendarDoctorComponent,
    SearchFilterPipe,
    HomeDoctorComponent
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ScheduleModule, RecurrenceEditorModule, DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule, MentionModule, TextBoxModule, NumericTextBoxModule, MaskedTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, SignatureModule, RatingModule, ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule, FabModule, SpeedDialModule, AccordionModule, ToolbarModule, ContextMenuModule, BreadcrumbModule, CarouselModule, TabModule, TreeViewModule, SidebarModule, MenuModule, AppBarModule, StepperModule,
    FullCalendarModule,
    BrowserAnimationsModule,    MatDialogModule,  ReactiveFormsModule
    
  
  ],
  providers: [SharedService,MatDialog,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
