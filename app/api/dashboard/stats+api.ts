import { DashboardStats } from '@/types';

// Mock data - in production, this would come from your database
const mockStats: DashboardStats = {
  totalPatients: 1247,
  todayAppointments: 28,
  pendingAppointments: 12,
  completedAppointments: 156,
  newPatientsThisMonth: 43,
  upcomingAppointments: [
    {
      id: '1',
      patientId: '1',
      patientName: 'Emily Johnson',
      doctorId: '1',
      doctorName: 'Dr. Sarah Wilson',
      type: 'checkup',
      status: 'confirmed',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Michael Brown',
      doctorId: '1',
      doctorName: 'Dr. Sarah Wilson',
      type: 'consultation',
      status: 'scheduled',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      duration: 45,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      patientId: '3',
      patientName: 'Lisa Davis',
      doctorId: '2',
      doctorName: 'Dr. James Miller',
      type: 'followup',
      status: 'confirmed',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      duration: 20,
      createdAt: new Date().toISOString(),
    },
  ],
  recentPatients: [
    {
      id: '1',
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      gender: 'female',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
      emergencyContact: {
        name: 'John Johnson',
        relationship: 'Spouse',
        phone: '+1 (555) 123-4568',
      },
      medicalHistory: ['Hypertension', 'Diabetes Type 2'],
      currentMedications: [
        {
          id: '1',
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          startDate: '2023-01-15',
          prescribedBy: 'Dr. Sarah Wilson',
        },
      ],
      allergies: ['Penicillin'],
      bloodType: 'A+',
      insuranceProvider: 'Blue Cross Blue Shield',
      insuranceNumber: 'BC123456789',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1978-07-22',
      gender: 'male',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
      },
      emergencyContact: {
        name: 'Sarah Brown',
        relationship: 'Spouse',
        phone: '+1 (555) 234-5679',
      },
      medicalHistory: ['Asthma'],
      currentMedications: [
        {
          id: '2',
          name: 'Albuterol',
          dosage: '90mcg',
          frequency: 'As needed',
          startDate: '2023-06-01',
          prescribedBy: 'Dr. James Miller',
        },
      ],
      allergies: [],
      bloodType: 'O-',
      insuranceProvider: 'Aetna',
      insuranceNumber: 'AET987654321',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export async function GET(request: Request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return Response.json(mockStats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return Response.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}