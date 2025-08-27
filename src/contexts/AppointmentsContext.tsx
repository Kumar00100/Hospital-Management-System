import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user.types';

interface Appointment {
  id: string;
  patient_name: string;
  doctor_name: string;
  department_name: string;
  date: string;
  time: string;
  status: string;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  fetchAppointments: () => Promise<void>;
  isLoading: boolean;
  patientId: string | null;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [patientId, setPatientId] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!user) {
      // Don't fetch if user is not logged in
      setAppointments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Fetching appointments for ${user.role}...`);
      let response;
      
      switch (user.role) {
        case 'patient':
          // First get the patient ID
          const patientResponse = await apiService.getPatientByUserId(user.id);
          if (patientResponse.data) {
            const patient = patientResponse.data as any;
            setPatientId(patient.id);
            response = await apiService.getAppointmentsByPatient(patient.id);
          } else {
            console.error('Failed to fetch patient data:', patientResponse.error);
            setAppointments([]);
            setIsLoading(false);
            return;
          }
          break;
        case 'doctor':
          response = await apiService.getAppointmentsByDoctor(user.id);
          break;
        case 'admin':
        case 'staff':
          response = await apiService.getAppointments();
          break;
        default:
          console.warn(`Unknown user role: ${user.role}`);
          setAppointments([]);
          setIsLoading(false);
          return;
      }

      console.log('Appointments API response:', response);
      if (response.data) {
        console.log('Appointments data received:', response.data);
        setAppointments(response.data as Appointment[]);
      } else if (response.error) {
        console.error('API Error:', response.error);
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      if (error instanceof Error && error.message.includes('Access denied')) {
        console.log('User does not have permission to view appointments');
      }
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <AppointmentsContext.Provider value={{ appointments, fetchAppointments, isLoading, patientId }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};

export default AppointmentsContext;
