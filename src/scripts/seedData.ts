import { seedSubjectsData } from './subjectData';
import { seedTeachersData } from './teachersData';

/**
 * Seed all database data (subjects and teachers)
 */
export const seedData = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Seed subjects first
    await seedSubjectsData();
    console.log('\n');
    
    // Then seed teachers (depends on subjects)
    await seedTeachersData();
    
    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export default seedData;

