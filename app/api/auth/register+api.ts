import jwt from 'jsonwebtoken';

// Mock users database (in production, this would be a real database)
const users: any[] = [];

const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, role = 'staff' } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return Response.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return Response.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: (users.length + 3).toString(), // Simple ID generation
      username: email.split('@')[0],
      email,
      password, // In production, hash this password
      role,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;

    return Response.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}