import { UserRole, Admin, Doctor, Staff, Patient } from '@/types/user.types';
import { Appointment, AppointmentStatus, AppointmentType } from '@/types/appointment.types';
import { Department } from '@/types/department.types';
import { MedicalRecord } from '@/types/patient.types';

// Mock Users with proper typing
export const mockUsers: (Admin | Doctor | Staff | Patient)[] = [
  {
    id: 'admin-001',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'John',
    lastName: 'Admin',
    phone: '+1-555-0101',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  } as Admin,
  {
    id: 'doctor-001',
    email: 'dr.smith@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    firstName: 'Sarah',
    lastName: 'Smith',
    phone: '+1-555-0102',
    specialization: 'Cardiology',
    licenseNumber: 'MD-12345',
    departmentId: 'dept-001',
    consultationFee: 200,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '09:00',
      endTime: '17:00',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  } as Doctor,
  {
    id: 'doctor-002',
    email: 'dr.johnson@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    firstName: 'Michael',
    lastName: 'Johnson',
    phone: '+1-555-0103',
    specialization: 'Neurology',
    licenseNumber: 'MD-67890',
    departmentId: 'dept-002',
    consultationFee: 250,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '10:00',
      endTime: '16:00',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  } as Doctor,
  {
    id: 'staff-001',
    email: 'staff@hospital.com',
    password: 'staff123',
    role: 'staff',
    firstName: 'Emily',
    lastName: 'Receptionist',
    phone: '+1-555-0104',
    departmentId: 'dept-001',
    position: 'Receptionist',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  } as Staff,
  {
    id: 'patient-001',
    email: 'patient1@email.com',
    password: 'patient123',
    role: 'patient',
    firstName: 'Alice',
    lastName: 'Brown',
    phone: '+1-555-0105',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'female',
    bloodGroup: 'O+',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    emergencyContact: {
      name: 'Bob Brown',
      phone: '+1-555-0106',
      relationship: 'Spouse',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  } as Patient,
  {
    id: 'patient-002',
    email: 'patient2@email.com',
    password: 'patient123',
    role: 'patient' as UserRole,
    firstName: 'David',
    lastName: 'Wilson',
    phone: '+1-555-0107',
    dateOfBirth: new Date('1985-08-22'),
    gender: 'male',
    bloodGroup: 'A-',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    },
    emergencyContact: {
      name: 'Sarah Wilson',
      phone: '+1-555-0108',
      relationship: 'Sister',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: 'dept-001',
    name: 'Cardiology',
    description: 'Specializes in heart and cardiovascular system disorders',
    headId: 'doctor-001',
    contactEmail: 'cardiology@hospital.com',
    contactPhone: '+1-555-0201',
    location: 'Building A, Floor 3',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'dept-002',
    name: 'Neurology',
    description: 'Specializes in disorders of the nervous system',
    headId: 'doctor-002',
    contactEmail: 'neurology@hospital.com',
    contactPhone: '+1-555-0202',
    location: 'Building B, Floor 2',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'dept-003',
    name: 'General Medicine',
    description: 'Primary care and general health services',
    contactEmail: 'general@hospital.com',
    contactPhone: '+1-555-0203',
    location: 'Building A, Floor 1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    departmentId: 'dept-001',
    appointmentDate: new Date('2024-12-20'),
    appointmentTime: '10:00',
    duration: 30,
    type: 'consultation' as AppointmentType,
    status: 'confirmed' as AppointmentStatus,
    reason: 'Chest pain and shortness of breath',
    notes: 'Patient reports mild chest discomfort during exercise',
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: 'apt-002',
    patientId: 'patient-002',
    doctorId: 'doctor-002',
    departmentId: 'dept-002',
    appointmentDate: new Date('2024-12-21'),
    appointmentTime: '14:00',
    duration: 45,
    type: 'follow-up' as AppointmentType,
    status: 'pending' as AppointmentStatus,
    reason: 'Follow-up for migraine treatment',
    createdAt: new Date('2024-12-16'),
    updatedAt: new Date('2024-12-16'),
  },
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'record-001',
    patientId: 'patient-001',
    doctorId: 'doctor-001',
    appointmentId: 'apt-001',
    visitDate: new Date('2024-12-20'),
    symptoms: ['chest pain', 'shortness of breath', 'fatigue'],
    diagnosis: 'Mild hypertension',
    treatment: 'Lifestyle changes and medication',
    medications: [
      {
        id: 'med-001',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food',
      },
    ],
    tests: [
      {
        id: 'test-001',
        name: 'ECG',
        type: 'imaging',
        status: 'completed',
        date: new Date('2024-12-20'),
        results: 'Normal sinus rhythm',
      },
    ],
    followUpDate: new Date('2025-01-20'),
    notes: 'Patient advised to reduce salt intake and exercise regularly',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
  },
];

// Helper functions
export const getUserByEmail = (email: string): (Admin | Doctor | Staff | Patient) | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const getUserById = (id: string): (Admin | Doctor | Staff | Patient) | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByRole = (role: UserRole): (Admin | Doctor | Staff | Patient)[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getDepartmentById = (id: string) => {
  return mockDepartments.find(dept => dept.id === id);
};

export const getAppointmentsByPatient = (patientId: string) => {
  return mockAppointments.filter(apt => apt.patientId === patientId);
};

export const getAppointmentsByDoctor = (doctorId: string) => {
  return mockAppointments.filter(apt => apt.doctorId === doctorId);
};
