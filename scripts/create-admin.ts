import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function createAdmin() {
  const email = process.argv[2] || 'admin@example.com';
  const password = process.argv[3] || 'Admin@123';
  const name = process.argv[4] || 'Admin User';

  console.log('Creating admin user...');
  console.log('Email:', email);
  console.log('Name:', name);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'admin',
          password: hashedPassword,
          name,
        },
      });
      console.log('✅ Existing user updated to admin:', updatedUser.email);
    } else {
      // Create new admin user
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'admin',
          emailVerified: new Date(),
        },
      });
      console.log('✅ Admin user created:', newUser.email);
    }

    console.log('\nYou can now login with:');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
