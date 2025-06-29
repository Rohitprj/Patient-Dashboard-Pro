import { Patient } from '@/types';

// Mock patients database
let patients: Patient[] = [
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
      {
        id: '2',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2023-01-15',
        prescribedBy: 'Dr. Sarah Wilson',
      },
    ],
    allergies: ['Penicillin'],
    bloodType: 'A+',
    insuranceProvider: 'Blue Cross Blue Shield',
    insuranceNumber: 'BC123456789',
    createdAt: '2023-01-15T10:00:00Z',
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
        id: '3',
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
    createdAt: '2023-06-01T14:30:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1992-11-08',
    gender: 'female',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
    },
    emergencyContact: {
      name: 'Robert Davis',
      relationship: 'Father',
      phone: '+1 (555) 345-6790',
    },
    medicalHistory: [],
    currentMedications: [],
    allergies: ['Shellfish'],
    bloodType: 'B+',
    insuranceProvider: 'Cigna',
    insuranceNumber: 'CIG456789123',
    createdAt: '2023-08-20T09:15:00Z',
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return Response.json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    return Response.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const patientData = await request.json();
    
    // Validate required fields
    if (!patientData.firstName || !patientData.lastName || !patientData.email) {
      return Response.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Check if patient with email already exists
    const existingPatient = patients.find(p => p.email === patientData.email);
    if (existingPatient) {
      return Response.json(
        { error: 'Patient with this email already exists' },
        { status: 409 }
      );
    }

    // Create new patient
    const newPatient: Patient = {
      id: (patients.length + 1).toString(),
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      email: patientData.email,
      phone: patientData.phone || '',
      dateOfBirth: patientData.dateOfBirth || '',
      gender: patientData.gender || 'other',
      address: patientData.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      emergencyContact: patientData.emergencyContact || {
        name: '',
        relationship: '',
        phone: '',
      },
      medicalHistory: patientData.medicalHistory || [],
      currentMedications: patientData.currentMedications || [],
      allergies: patientData.allergies || [],
      bloodType: patientData.bloodType || '',
      insuranceProvider: patientData.insuranceProvider || '',
      insuranceNumber: patientData.insuranceNumber || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    patients.push(newPatient);

    return Response.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Create patient error:', error);
    return Response.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}