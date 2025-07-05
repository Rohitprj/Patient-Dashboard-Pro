import { Patient } from '@/types';

// Import patients from the main patients API
import { getPatients, updatePatients } from '../patients+api';

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const patients = getPatients();
    const patient = patients.find(p => p.id === id);
    
    if (!patient) {
      return Response.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    return Response.json(patient);
  } catch (error) {
    console.error('Get patient error:', error);
    return Response.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { id }: { id: string }) {
  try {
    const patientData = await request.json();
    const patients = getPatients();
    const patientIndex = patients.findIndex(p => p.id === id);
    
    if (patientIndex === -1) {
      return Response.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Update patient
    const updatedPatient = {
      ...patients[patientIndex],
      ...patientData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    patients[patientIndex] = updatedPatient;
    updatePatients(patients);

    return Response.json(updatedPatient);
  } catch (error) {
    console.error('Update patient error:', error);
    return Response.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { id }: { id: string }) {
  try {
    const patients = getPatients();
    const patientIndex = patients.findIndex(p => p.id === id);
    
    if (patientIndex === -1) {
      return Response.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Remove patient from array
    patients.splice(patientIndex, 1);
    updatePatients(patients);

    return Response.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    return Response.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}