export interface Department {
  id: string;
  name: string;
  description: string;
  headId?: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentWithStats extends Department {
  doctorCount: number;
  staffCount: number;
  appointmentCount: number;
}
