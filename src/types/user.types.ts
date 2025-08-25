export type UserRole = 'admin' | 'doctor' | 'staff' | 'patient';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  departmentId: string;
  consultationFee: number;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

export interface Staff extends User {
  role: 'staff';
  departmentId: string;
  position: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}
