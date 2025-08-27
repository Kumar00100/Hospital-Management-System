const API_BASE_URL = 'http://localhost:3001/api'; // Updated to use the correct port

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const token = localStorage.getItem('hms-token');
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      console.log(`API Request: ${options.method || 'GET'} ${url}`);
      console.log('Token available:', !!token);
      
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
        console.error(`API Error (${response.status}):`, errorMessage, data);
        throw new Error(errorMessage);
      }

      return { data };
    } catch (error) {
      console.error('API Request Error:', error);
      
      // Handle specific error types
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { 
          error: 'Network error: Unable to connect to the server. Please check if the backend is running.' 
        };
      }
      
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string, role: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // User endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getRecentRegistrations() {
    return this.request('/users/recent');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async updateUser(id: string, userData: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Department endpoints
  async getDepartments() {
    return this.request('/departments');
  }

  async getDepartmentById(id: string) {
    return this.request(`/departments/${id}`);
  }

  // Doctor endpoints
  async getDoctors() {
    return this.request('/doctors');
  }

  async getDoctorById(id: string) {
    return this.request(`/doctors/${id}`);
  }

  async getDoctorsByDepartment(departmentId: string) {
    return this.request(`/doctors/department/${departmentId}`);
  }

  // Patient endpoints
  async getPatients() {
    return this.request('/patients');
  }

  async getPatientById(id: string) {
    return this.request(`/patients/${id}`);
  }

  async getPatientByUserId(userId: string) {
    return this.request(`/patients/user/${userId}`);
  }

  async getPatientsByDoctor(doctorId: string) {
    return this.request(`/patients/doctor/${doctorId}`);
  }

  // Appointment endpoints
  async getAppointments() {
    return this.request('/appointments');
  }

  async getAppointmentById(id: string) {
    return this.request(`/appointments/${id}`);
  }

  async createAppointment(appointmentData: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id: string, appointmentData: any) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointmentsByDoctor(doctorId: string) {
    return this.request(`/appointments/doctor/${doctorId}`);
  }

  async getAppointmentsByPatient(patientId: string) {
    return this.request(`/appointments/patient/${patientId}`);
  }

  // Feedback endpoints
  async getFeedbacks() {
    return this.request('/feedbacks');
  }

  async createFeedback(feedbackData: any) {
    return this.request('/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  // Gallery endpoints
  async getGallery() {
    return this.request('/gallery');
  }

  // Prescription endpoints
  async getPrescriptions() {
    return this.request('/prescriptions');
  }

  async createPrescription(prescriptionData: any) {
    return this.request('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  }
}

export const apiService = new ApiService();
export default apiService;

