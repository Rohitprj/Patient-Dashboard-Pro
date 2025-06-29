import { Appointment } from '@/types';

// Mock appointments database
const appointments: Appointment[] = [
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
    notes: 'Regular checkup for diabetes management',
    createdAt: '2023-12-01T08:00:00Z',
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
    notes: 'Asthma consultation and medication review',
    createdAt: '2023-12-01T09:00:00Z',
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
    notes: 'Follow-up after recent blood work',
    createdAt: '2023-12-01T10:00:00Z',
  },
  {
    id: '4',
    patientId: '1',
    patientName: 'Emily Johnson',
    doctorId: '2',
    doctorName: 'Dr. James Miller',
    type: 'emergency',
    status: 'completed',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '16:30',
    duration: 60,
    notes: 'Emergency visit for chest pain - resolved',
    createdAt: '2023-11-30T15:30:00Z',
  },
  {
    id: '5',
    patientId: '2',
    patientName: 'Michael Brown',
    doctorId: '1',
    doctorName: 'Dr. Sarah Wilson',
    type: 'checkup',
    status: 'cancelled',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:00',
    duration: 30,
    notes: 'Patient cancelled due to scheduling conflict',
    createdAt: '2023-12-02T08:00:00Z',
  },
];

export async function GET(request: Request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return Response.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    return Response.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const appointmentData = await request.json();
    
    // Validate required fields
    if (!appointmentData.patientId || !appointmentData.doctorId || !appointmentData.date || !appointmentData.time) {
      return Response.json(
        { error: 'Patient ID, doctor ID, date, and time are required' },
        { status: 400 }
      );
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName || 'Unknown Patient',
      doctorId: appointmentData.doctorId,
      doctorName: appointmentData.doctorName || 'Unknown Doctor',
      type: appointmentData.type || 'checkup',
      status: appointmentData.status || 'scheduled',
      date: appointmentData.date,
      time: appointmentData.time,
      duration: appointmentData.duration || 30,
      notes: appointmentData.notes || '',
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    return Response.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error('Create appointment error:', error);
    return Response.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}