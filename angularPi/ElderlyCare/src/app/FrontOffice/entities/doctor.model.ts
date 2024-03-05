import { Appointment } from "./appointment.model";

export interface Doctor {
    idDoctor: number;
    doctorType: string;
    specialization: string;
    schedule: string;
    username: string;
    password: string;
    phoneNumber: string;
  //  medicalFolders: MedicalFolder[];
    //messages: Message[];
    //complaints: Complaint[];
  }