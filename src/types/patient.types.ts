export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  visitDate: Date;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  tests: Test[];
  followUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Test {
  id: string;
  name: string;
  type: 'blood' | 'imaging' | 'urine' | 'other';
  results?: string;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
}

export interface PatientRecord extends MedicalRecord {
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

export interface Feedback {
  id: string;
  patientId: string;
  doctorId?: string;
  appointmentId?: string;
  rating: number; // 1-5
  comment: string;
  type: 'doctor' | 'service' | 'facility';
  createdAt: Date;
}
