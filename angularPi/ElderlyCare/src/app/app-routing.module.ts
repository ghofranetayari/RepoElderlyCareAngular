import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { CalendarComponent } from './FrontOffice/pages2/calendar/calendar.component';
import { ElderlyDashboardComponent } from './FrontOffice/pages2/elderly-dashboard/elderly-dashboard.component';
import { DoctorProfileComponent } from './FrontOffice/pages2/doctor-profile/doctor-profile.component';
import { CalendarDoctorComponent } from './FrontOffice/pages2/calendar-doctor/calendar-doctor.component';
import { HomeDoctorComponent } from './FrontOffice/pages2/home-doctor/home-doctor.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "",
    component: AllTemplateFrontComponent,
    children: [
      {
        path: "home",
        component: HomeFrontComponent
      },
      {
    path: "calendar",
    component: CalendarComponent
  }, { path: 'dash/:elderlyId', component: ElderlyDashboardComponent },

  { path: 'doctor-profile/:id/:elderlyId', component: DoctorProfileComponent },
  //teb3a l elderly 
  { path: 'doctor-calendar/:id/:elderlyId', component: CalendarComponent },
  {//http://localhost:4200/calendarDoctor/1?calendarId=1
    path: 'calendarDoctor/:id',
    component: CalendarDoctorComponent
  },
  {
    path: "homeDoctor/:id",
    component: HomeDoctorComponent
  }

    ]

  },
  {
    path: "admin",
    component: AllTemplateBackComponent
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}