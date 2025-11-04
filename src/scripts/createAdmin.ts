import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/User.model';
import { UserRole } from '../types';

dotenv.config();

/**
 * Create an admin account
 */
const createAdmin = async (): Promise<void> => {
  try {
    console.log('🔐 Creating admin account...\n');
    
    // Connect to database
    try {
      await connectDatabase();
      console.log('✅ Connected to database\n');
    } catch (dbError: any) {
      console.error('❌ Database connection failed:', dbError.message);
      console.error('\n💡 Make sure:');
      console.error('   1. MongoDB is running');
      console.error('   2. MONGODB_URI is set in your .env file');
      console.error('   3. Your connection string is correct\n');
      process.exit(1);
    }

    // Admin credentials
    const adminEmail = 'admin@coderoofs.com';
    const adminPassword = 'Admin123!';
    const adminName = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin account already exists!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
      console.log('\n✅ Admin credentials (existing account):');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: UserRole.ADMIN
    });

    console.log('✅ Admin account created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Close database connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAdmin();

