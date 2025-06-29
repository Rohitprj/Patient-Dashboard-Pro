import jwt from 'jsonwebtoken';

// Mock users database
const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@hospital.com',
    password: 'admin123', // In production, this would be hashed
    role: 'admin' as const,
    firstName: 'John',
    lastName: 'Admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'doctor',
    email: 'doctor@hospital.com',
    password: 'doctor123',
    role: 'doctor' as const,
    firstName: 'Sarah',
    lastName: 'Wilson',
    createdAt: new Date().toISOString(),
  },
];

const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}