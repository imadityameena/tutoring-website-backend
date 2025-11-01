import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Subject } from '../models/Subject.model';

dotenv.config();

// Organized by major streams/branches
const subjectsData = [
  // ==================== COMPUTER SCIENCE ====================
  {
    name: "Python",
    description: "Learn Python programming from basics to advanced. Master data structures, algorithms, and Python libraries.",
    category: "Computer Science",
    difficulty: "Beginner"
  },
  {
    name: "C++",
    description: "Master C++ programming with object-oriented concepts, memory management, and advanced C++ features.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },
  {
    name: "Java",
    description: "Learn Java programming including OOP, collections, multithreading, and enterprise development.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },
  {
    name: "JavaScript",
    description: "Master JavaScript for web development including ES6+, DOM manipulation, and modern frameworks.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },
  {
    name: "Web Development",
    description: "Full-stack web development including HTML, CSS, React, Node.js, and backend technologies.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },
  {
    name: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms. Prepare for technical interviews and competitive programming.",
    category: "Computer Science",
    difficulty: "Advanced"
  },
  {
    name: "Machine Learning",
    description: "Learn machine learning concepts, algorithms, and implementation using Python and ML libraries.",
    category: "Computer Science",
    difficulty: "Advanced"
  },
  {
    name: "Database Management",
    description: "Learn SQL, database design, normalization, and working with relational and NoSQL databases.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },
  {
    name: "Cybersecurity",
    description: "Understand cybersecurity fundamentals, ethical hacking, network security, and secure coding practices.",
    category: "Computer Science",
    difficulty: "Advanced"
  },
  {
    name: "Software Engineering",
    description: "Learn software development lifecycle, design patterns, testing, version control, and best practices.",
    category: "Computer Science",
    difficulty: "Intermediate"
  },

  // ==================== MATHEMATICS ====================
  {
    name: "Algebra",
    description: "Master algebraic concepts including equations, inequalities, polynomials, and algebraic expressions.",
    category: "Mathematics",
    difficulty: "Beginner"
  },
  {
    name: "Calculus",
    description: "Learn differential and integral calculus, limits, derivatives, and their applications in real-world problems.",
    category: "Mathematics",
    difficulty: "Advanced"
  },
  {
    name: "Geometry",
    description: "Study shapes, angles, theorems, coordinate geometry, and geometric proofs.",
    category: "Mathematics",
    difficulty: "Beginner"
  },
  {
    name: "Statistics",
    description: "Learn statistical concepts, probability, data analysis, hypothesis testing, and statistical inference.",
    category: "Mathematics",
    difficulty: "Intermediate"
  },
  {
    name: "Linear Algebra",
    description: "Master vectors, matrices, linear transformations, eigenvalues, and their applications.",
    category: "Mathematics",
    difficulty: "Advanced"
  },
  {
    name: "Trigonometry",
    description: "Learn trigonometric functions, identities, equations, and their applications in geometry and physics.",
    category: "Mathematics",
    difficulty: "Intermediate"
  },
  {
    name: "Discrete Mathematics",
    description: "Study discrete structures including logic, set theory, combinatorics, and graph theory.",
    category: "Mathematics",
    difficulty: "Advanced"
  },
  {
    name: "Probability",
    description: "Master probability theory, random variables, distributions, and probability models.",
    category: "Mathematics",
    difficulty: "Intermediate"
  },

  // ==================== PHYSICS ====================
  {
    name: "Mechanics",
    description: "Study motion, forces, energy, momentum, and Newton's laws of motion.",
    category: "Physics",
    difficulty: "Intermediate"
  },
  {
    name: "Thermodynamics",
    description: "Learn heat, energy, entropy, and the laws of thermodynamics with practical applications.",
    category: "Physics",
    difficulty: "Advanced"
  },
  {
    name: "Electromagnetism",
    description: "Master electric fields, magnetic fields, electromagnetic waves, and their applications.",
    category: "Physics",
    difficulty: "Advanced"
  },
  {
    name: "Quantum Physics",
    description: "Explore quantum mechanics, wave-particle duality, quantum states, and quantum computing fundamentals.",
    category: "Physics",
    difficulty: "Advanced"
  },
  {
    name: "Optics",
    description: "Study light, reflection, refraction, lenses, and optical instruments.",
    category: "Physics",
    difficulty: "Intermediate"
  },
  {
    name: "Modern Physics",
    description: "Learn relativity, quantum mechanics, atomic physics, and nuclear physics.",
    category: "Physics",
    difficulty: "Advanced"
  },
  {
    name: "Waves & Oscillations",
    description: "Understand wave motion, sound waves, wave interference, and harmonic motion.",
    category: "Physics",
    difficulty: "Intermediate"
  },

  // ==================== CHEMISTRY ====================
  {
    name: "Organic Chemistry",
    description: "Study carbon compounds, reactions, functional groups, and organic synthesis.",
    category: "Chemistry",
    difficulty: "Advanced"
  },
  {
    name: "Inorganic Chemistry",
    description: "Learn about elements, periodic table, chemical bonding, and inorganic compounds.",
    category: "Chemistry",
    difficulty: "Intermediate"
  },
  {
    name: "Physical Chemistry",
    description: "Master chemical thermodynamics, kinetics, quantum chemistry, and spectroscopy.",
    category: "Chemistry",
    difficulty: "Advanced"
  },
  {
    name: "Biochemistry",
    description: "Study chemical processes in living organisms, biomolecules, and metabolic pathways.",
    category: "Chemistry",
    difficulty: "Advanced"
  },
  {
    name: "General Chemistry",
    description: "Learn fundamental chemistry concepts, atomic structure, chemical reactions, and stoichiometry.",
    category: "Chemistry",
    difficulty: "Beginner"
  },
  {
    name: "Analytical Chemistry",
    description: "Master techniques for analyzing chemical composition and quantitative analysis methods.",
    category: "Chemistry",
    difficulty: "Intermediate"
  },

  // ==================== BIOLOGY ====================
  {
    name: "Cell Biology",
    description: "Study cell structure, organelles, cell division, and cellular processes.",
    category: "Biology",
    difficulty: "Intermediate"
  },
  {
    name: "Genetics",
    description: "Learn inheritance, DNA, RNA, gene expression, and genetic engineering.",
    category: "Biology",
    difficulty: "Intermediate"
  },
  {
    name: "Anatomy & Physiology",
    description: "Study human body systems, organs, and their functions.",
    category: "Biology",
    difficulty: "Intermediate"
  },
  {
    name: "Ecology",
    description: "Learn ecosystems, biodiversity, environmental interactions, and conservation.",
    category: "Biology",
    difficulty: "Beginner"
  },
  {
    name: "Microbiology",
    description: "Study microorganisms, bacteria, viruses, and their roles in health and disease.",
    category: "Biology",
    difficulty: "Intermediate"
  },
  {
    name: "Molecular Biology",
    description: "Explore DNA replication, transcription, translation, and molecular mechanisms of life.",
    category: "Biology",
    difficulty: "Advanced"
  },
  {
    name: "Botany",
    description: "Study plants, their structure, growth, reproduction, and classification.",
    category: "Biology",
    difficulty: "Beginner"
  },
  {
    name: "Zoology",
    description: "Learn about animals, their classification, behavior, and evolutionary relationships.",
    category: "Biology",
    difficulty: "Beginner"
  },

  // ==================== ENGLISH & LANGUAGE ARTS ====================
  {
    name: "Grammar",
    description: "Master English grammar rules, syntax, punctuation, and sentence structure.",
    category: "Language Arts",
    difficulty: "Beginner"
  },
  {
    name: "Literature",
    description: "Study literary works, analysis, literary devices, and critical reading skills.",
    category: "Language Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Creative Writing",
    description: "Develop creative writing skills including fiction, poetry, and storytelling techniques.",
    category: "Language Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Academic Writing",
    description: "Learn essay writing, research papers, citations, and academic writing standards.",
    category: "Language Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Reading Comprehension",
    description: "Improve reading skills, comprehension strategies, and critical analysis of texts.",
    category: "Language Arts",
    difficulty: "Beginner"
  },
  {
    name: "SAT/ACT Prep",
    description: "Prepare for standardized tests with practice questions, strategies, and test-taking techniques.",
    category: "Language Arts",
    difficulty: "Intermediate"
  },

  // ==================== HISTORY & SOCIAL STUDIES ====================
  {
    name: "World History",
    description: "Explore major events, civilizations, and developments throughout world history.",
    category: "Social Studies",
    difficulty: "Beginner"
  },
  {
    name: "US History",
    description: "Study American history from colonial times to modern era, including key events and figures.",
    category: "Social Studies",
    difficulty: "Beginner"
  },
  {
    name: "European History",
    description: "Learn about European civilizations, wars, revolutions, and cultural developments.",
    category: "Social Studies",
    difficulty: "Intermediate"
  },
  {
    name: "Ancient History",
    description: "Study ancient civilizations including Egypt, Greece, Rome, and Mesopotamia.",
    category: "Social Studies",
    difficulty: "Beginner"
  },
  {
    name: "Geography",
    description: "Explore physical geography, human geography, maps, and global patterns.",
    category: "Social Studies",
    difficulty: "Beginner"
  },
  {
    name: "Political Science",
    description: "Learn about government systems, political theory, and civic engagement.",
    category: "Social Studies",
    difficulty: "Intermediate"
  },

  // ==================== CREATIVE ARTS ====================
  {
    name: "Drawing",
    description: "Learn drawing techniques, perspective, shading, and artistic fundamentals.",
    category: "Creative Arts",
    difficulty: "Beginner"
  },
  {
    name: "Painting",
    description: "Master painting techniques using various mediums including watercolor, oil, and acrylic.",
    category: "Creative Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Digital Art",
    description: "Learn digital art creation using software like Photoshop, Illustrator, and digital painting tools.",
    category: "Creative Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Music Theory",
    description: "Study musical notation, scales, chords, harmony, and composition principles.",
    category: "Creative Arts",
    difficulty: "Intermediate"
  },
  {
    name: "Guitar",
    description: "Learn guitar playing from beginner chords to advanced techniques and styles.",
    category: "Creative Arts",
    difficulty: "Beginner"
  },
  {
    name: "Piano",
    description: "Master piano playing, reading music, and performance techniques.",
    category: "Creative Arts",
    difficulty: "Beginner"
  },
  {
    name: "Music Production",
    description: "Learn music production, recording, mixing, and using digital audio workstations.",
    category: "Creative Arts",
    difficulty: "Intermediate"
  }
];

export const seedSubjectsData = async () => {
  try {
    console.log('🌱 Starting subject data seeding...');
    
    // Connect to database
    await connectDatabase();
    console.log('✅ Connected to database');

    // Create subjects
    console.log('📚 Creating subjects...');
    let createdCount = 0;
    let existingCount = 0;
    
    for (const subjectData of subjectsData) {
      const existingSubject = await Subject.findOne({ name: subjectData.name });
      if (!existingSubject) {
        await Subject.create(subjectData);
        createdCount++;
        console.log(`  ✓ Created subject: ${subjectData.name} (${subjectData.category})`);
      } else {
        existingCount++;
        console.log(`  ⊙ Subject already exists: ${subjectData.name}`);
      }
    }

    // Group by category for summary
    const byCategory: { [key: string]: number } = {};
    subjectsData.forEach(subj => {
      byCategory[subj.category] = (byCategory[subj.category] || 0) + 1;
    });

    console.log(`\n🎉 Subject seeding completed successfully!`);
    console.log(`   - New subjects created: ${createdCount}`);
    console.log(`   - Existing subjects: ${existingCount}`);
    console.log(`   - Total subjects: ${subjectsData.length}`);
    console.log('\n📊 Subjects by category:');
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} subjects`);
    });
    console.log('\n✨ Subject data is ready!');

  } catch (error) {
    console.error('❌ Error seeding subject data:', error);
    throw error;
  }
};

// Run if called directly (when using ts-node)
if (require.main === module) {
  seedSubjectsData()
    .then(() => {
      console.log('✅ Subject seed script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Subject seed script failed:', error);
      process.exit(1);
    });
}

// Export for use in other modules
export default seedSubjectsData;

