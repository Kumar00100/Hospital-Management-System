export type AppointmentType = 'consultation' | 'follow-up' | 'emergency';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  departmentId: string;
  appointmentDate: Date;
  appointmentTime: string;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  prescription?: string;
  diagnosis?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentWithDetails extends Appointment {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
  department: {
    id: string;
    name: string;
  };
}
