import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Subject } from '../models/Subject.model';
import { User } from '../models/User.model';
import { Teacher } from '../models/Teacher.model';
import { UserRole } from '../types';

dotenv.config();

const teachersData = [
  // ==================== COMPUTER SCIENCE ====================
  
  // Python Teachers
  {
    name: "Prof. Sam Jackson",
    email: "sam.jackson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Python", "Web Development"],
    bio: "Computer Science professor specializing in Python, web development, and full-stack technologies. 12 years of teaching experience.",
    rating: 4.8
  },
  {
    name: "Ms. Maya Singh",
    email: "maya.singh@tutoring.com",
    password: "Teacher123!",
    subjects: ["Python", "Data Structures & Algorithms"],
    bio: "Full-stack developer and coding instructor. Helps students learn Python from basics to advanced concepts including ML.",
    rating: 4.7
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@tutoring.com",
    password: "Teacher123!",
    subjects: ["Python", "Machine Learning"],
    bio: "Data scientist and Python expert. Specializes in Python programming, data analysis, and machine learning applications.",
    rating: 4.9
  },

  // C++ Teachers
  {
    name: "Dr. Michael Thompson",
    email: "michael.thompson@tutoring.com",
    password: "Teacher123!",
    subjects: ["C++", "Data Structures & Algorithms"],
    bio: "Computer Science expert with industry experience. Teaches C++, advanced programming, and algorithm design.",
    rating: 4.9
  },
  {
    name: "Prof. Robert Chen",
    email: "robert.chen@tutoring.com",
    password: "Teacher123!",
    subjects: ["C++", "Software Engineering"],
    bio: "Software engineer and C++ specialist. Expert in object-oriented programming, memory management, and system design.",
    rating: 4.8
  },
  {
    name: "Mr. David Park",
    email: "david.park@tutoring.com",
    password: "Teacher123!",
    subjects: ["C++"],
    bio: "Systems programming expert with 8 years of experience. Specializes in C++ and low-level programming concepts.",
    rating: 4.7
  },

  // Java Teachers
  {
    name: "Dr. Alex Kumar",
    email: "alex.kumar@tutoring.com",
    password: "Teacher123!",
    subjects: ["Java", "Software Engineering"],
    bio: "Software engineer turned educator. Teaches Java, enterprise development, and software engineering best practices.",
    rating: 4.9
  },
  {
    name: "Ms. Jennifer Lee",
    email: "jennifer.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["Java", "Database Management"],
    bio: "Java and backend development specialist. Expert in Spring framework, enterprise Java, and database integration.",
    rating: 4.8
  },
  {
    name: "Prof. Kevin Zhang",
    email: "kevin.zhang@tutoring.com",
    password: "Teacher123!",
    subjects: ["Java"],
    bio: "Java programming instructor with focus on OOP, design patterns, and Java ecosystem technologies.",
    rating: 4.7
  },

  // JavaScript Teachers
  {
    name: "Ms. Sarah Johnson",
    email: "sarah.johnson@tutoring.com",
    password: "Teacher123!",
    subjects: ["JavaScript", "Web Development"],
    bio: "Frontend developer and JavaScript expert. Specializes in modern JavaScript, React, and Node.js development.",
    rating: 4.9
  },
  {
    name: "Mr. Tom Anderson",
    email: "tom.anderson@tutoring.com",
    password: "Teacher123!",
    subjects: ["JavaScript", "Web Development"],
    bio: "Full-stack JavaScript developer. Teaches vanilla JS, ES6+, frameworks, and modern web development practices.",
    rating: 4.8
  },
  {
    name: "Ms. Lisa Martinez",
    email: "lisa.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["JavaScript"],
    bio: "JavaScript instructor with expertise in asynchronous programming, APIs, and frontend frameworks.",
    rating: 4.7
  },

  // Web Development Teachers
  {
    name: "Dr. Ryan O'Connor",
    email: "ryan.oconnor@tutoring.com",
    password: "Teacher123!",
    subjects: ["Web Development", "Software Engineering"],
    bio: "Full-stack web development expert. Teaches modern web technologies, React, Node.js, and best practices.",
    rating: 4.8
  },
  {
    name: "Ms. Emma Wilson",
    email: "emma.wilson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Web Development"],
    bio: "Web developer and instructor specializing in responsive design, accessibility, and modern frontend technologies.",
    rating: 4.7
  },

  // Data Structures & Algorithms Teachers
  {
    name: "Dr. James Liu",
    email: "james.liu@tutoring.com",
    password: "Teacher123!",
    subjects: ["Data Structures & Algorithms", "Software Engineering"],
    bio: "Algorithms expert and former Google engineer. Prepares students for technical interviews and competitive programming.",
    rating: 4.9
  },
  {
    name: "Prof. Anna Brown",
    email: "anna.brown@tutoring.com",
    password: "Teacher123!",
    subjects: ["Data Structures & Algorithms"],
    bio: "Computer science professor specializing in algorithms and data structures. Helps students master problem-solving.",
    rating: 4.8
  },

  // Machine Learning Teachers
  {
    name: "Dr. Ryan O'Connor",
    email: "ryan.oconnor.ml@tutoring.com",
    password: "Teacher123!",
    subjects: ["Machine Learning", "Python"],
    bio: "AI and Machine Learning expert. Teaches ML concepts, neural networks, and implementation using Python libraries.",
    rating: 4.9
  },
  {
    name: "Dr. Maria Rodriguez",
    email: "maria.rodriguez.cs@tutoring.com",
    password: "Teacher123!",
    subjects: ["Machine Learning"],
    bio: "ML engineer and researcher. Specializes in deep learning, computer vision, and natural language processing.",
    rating: 4.8
  },

  // Database Management Teachers
  {
    name: "Prof. Daniel Kim",
    email: "daniel.kim@tutoring.com",
    password: "Teacher123!",
    subjects: ["Database Management", "Software Engineering"],
    bio: "Database architect and instructor. Expert in SQL, database design, NoSQL, and database optimization.",
    rating: 4.8
  },
  {
    name: "Ms. Rachel Cooper",
    email: "rachel.cooper@tutoring.com",
    password: "Teacher123!",
    subjects: ["Database Management"],
    bio: "Database specialist with expertise in relational databases, query optimization, and data modeling.",
    rating: 4.7
  },

  // Cybersecurity Teachers
  {
    name: "Prof. Mark Stevens",
    email: "mark.stevens@tutoring.com",
    password: "Teacher123!",
    subjects: ["Cybersecurity"],
    bio: "Cybersecurity expert and ethical hacker. Teaches network security, cryptography, and secure coding practices.",
    rating: 4.9
  },
  {
    name: "Mr. Brian Foster",
    email: "brian.foster@tutoring.com",
    password: "Teacher123!",
    subjects: ["Cybersecurity"],
    bio: "Information security specialist with industry experience. Focuses on practical security implementations and defense strategies.",
    rating: 4.8
  },

  // Software Engineering Teachers
  {
    name: "Dr. Patricia Moore",
    email: "patricia.moore@tutoring.com",
    password: "Teacher123!",
    subjects: ["Software Engineering"],
    bio: "Software engineering professor. Teaches SDLC, design patterns, testing, version control, and agile methodologies.",
    rating: 4.8
  },

  // ==================== MATHEMATICS ====================
  
  // Algebra Teachers
  {
    name: "Prof. James Chen",
    email: "james.chen@tutoring.com",
    password: "Teacher123!",
    subjects: ["Algebra", "Geometry"],
    bio: "Mathematics professor with expertise in algebra, geometry, and statistics. Helped 500+ students excel in exams.",
    rating: 4.8
  },
  {
    name: "Ms. Emily Rodriguez",
    email: "emily.rodriguez@tutoring.com",
    password: "Teacher123!",
    subjects: ["Algebra", "Trigonometry"],
    bio: "Experienced tutor specializing in high school mathematics. Patient and methodical teaching approach.",
    rating: 4.7
  },
  {
    name: "Mr. Chris Davis",
    email: "chris.davis@tutoring.com",
    password: "Teacher123!",
    subjects: ["Algebra"],
    bio: "Algebra specialist helping students master equations, inequalities, and polynomial concepts.",
    rating: 4.6
  },

  // Calculus Teachers
  {
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@tutoring.com",
    password: "Teacher123!",
    subjects: ["Calculus", "Linear Algebra"],
    bio: "PhD in Applied Mathematics with 10 years of teaching experience. Specializes in calculus, linear algebra, and advanced math.",
    rating: 4.9
  },
  {
    name: "Prof. Richard Taylor",
    email: "richard.taylor@tutoring.com",
    password: "Teacher123!",
    subjects: ["Calculus"],
    bio: "Calculus expert with 15 years of experience. Makes differential and integral calculus concepts clear and understandable.",
    rating: 4.8
  },
  {
    name: "Dr. Nancy White",
    email: "nancy.white@tutoring.com",
    password: "Teacher123!",
    subjects: ["Calculus", "Probability"],
    bio: "Mathematics professor specializing in calculus and probability theory. Expert in applications and problem-solving.",
    rating: 4.7
  },

  // Geometry Teachers
  {
    name: "Ms. Linda Garcia",
    email: "linda.garcia@tutoring.com",
    password: "Teacher123!",
    subjects: ["Geometry", "Trigonometry"],
    bio: "Geometry and trigonometry specialist. Makes geometric proofs and spatial reasoning accessible to all students.",
    rating: 4.8
  },
  {
    name: "Mr. Paul Thompson",
    email: "paul.thompson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Geometry"],
    bio: "Experienced geometry tutor focusing on coordinate geometry, theorems, and geometric problem-solving.",
    rating: 4.7
  },

  // Statistics Teachers
  {
    name: "Dr. Susan Lee",
    email: "susan.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["Statistics", "Probability"],
    bio: "Statistics professor with expertise in data analysis, hypothesis testing, and statistical inference methods.",
    rating: 4.9
  },
  {
    name: "Prof. Michael Brown",
    email: "michael.brown.math@tutoring.com",
    password: "Teacher123!",
    subjects: ["Statistics"],
    bio: "Statistical analysis expert. Helps students understand probability distributions and statistical modeling.",
    rating: 4.8
  },

  // Linear Algebra Teachers
  {
    name: "Dr. Jonathan Smith",
    email: "jonathan.smith@tutoring.com",
    password: "Teacher123!",
    subjects: ["Linear Algebra", "Discrete Mathematics"],
    bio: "Linear algebra and discrete math specialist. Expert in matrices, vectors, and their applications in computer science.",
    rating: 4.9
  },
  {
    name: "Prof. Catherine Hill",
    email: "catherine.hill@tutoring.com",
    password: "Teacher123!",
    subjects: ["Linear Algebra"],
    bio: "Mathematics professor specializing in linear transformations, eigenvalues, and advanced linear algebra concepts.",
    rating: 4.8
  },

  // Trigonometry Teachers
  {
    name: "Mr. Steven Clark",
    email: "steven.clark@tutoring.com",
    password: "Teacher123!",
    subjects: ["Trigonometry"],
    bio: "Trigonometry tutor with focus on trigonometric functions, identities, and their practical applications.",
    rating: 4.7
  },

  // Discrete Mathematics Teachers
  {
    name: "Dr. Amanda Wright",
    email: "amanda.wright@tutoring.com",
    password: "Teacher123!",
    subjects: ["Discrete Mathematics"],
    bio: "Discrete mathematics expert. Teaches logic, set theory, combinatorics, and graph theory fundamentals.",
    rating: 4.8
  },

  // Probability Teachers
  {
    name: "Dr. Robert Martinez",
    email: "robert.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["Probability"],
    bio: "Probability theory specialist. Helps students master random variables, distributions, and probability models.",
    rating: 4.7
  },

  // ==================== PHYSICS ====================
  
  // Mechanics Teachers
  {
    name: "Prof. Robert Anderson",
    email: "robert.anderson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Mechanics", "Waves & Oscillations"],
    bio: "Physics teacher with 15 years of experience. Specializes in mechanics, waves, and classical physics.",
    rating: 4.8
  },
  {
    name: "Dr. Jennifer Adams",
    email: "jennifer.adams@tutoring.com",
    password: "Teacher123!",
    subjects: ["Mechanics"],
    bio: "Mechanics specialist with expertise in Newton's laws, energy, momentum, and rotational motion.",
    rating: 4.7
  },

  // Thermodynamics Teachers
  {
    name: "Dr. Lisa Wang",
    email: "lisa.wang@tutoring.com",
    password: "Teacher123!",
    subjects: ["Thermodynamics", "Modern Physics"],
    bio: "Theoretical physicist with PhD from MIT. Expert in quantum mechanics, thermodynamics, and advanced physics.",
    rating: 4.9
  },
  {
    name: "Prof. David Chang",
    email: "david.chang@tutoring.com",
    password: "Teacher123!",
    subjects: ["Thermodynamics"],
    bio: "Thermodynamics expert. Makes heat, energy, entropy, and thermodynamic laws accessible to students.",
    rating: 4.8
  },

  // Electromagnetism Teachers
  {
    name: "Dr. Priya Patel",
    email: "priya.patel@tutoring.com",
    password: "Teacher123!",
    subjects: ["Electromagnetism", "Optics"],
    bio: "Research physicist turned educator. Makes complex physics concepts like electromagnetism accessible and engaging.",
    rating: 4.7
  },
  {
    name: "Prof. Andrew Kim",
    email: "andrew.kim@tutoring.com",
    password: "Teacher123!",
    subjects: ["Electromagnetism"],
    bio: "Electromagnetism specialist with expertise in electric and magnetic fields, Maxwell's equations, and applications.",
    rating: 4.8
  },

  // Quantum Physics Teachers
  {
    name: "Dr. Laura Chen",
    email: "laura.chen@tutoring.com",
    password: "Teacher123!",
    subjects: ["Quantum Physics"],
    bio: "Quantum physics researcher and educator. Expert in quantum mechanics, wave-particle duality, and quantum states.",
    rating: 4.9
  },
  {
    name: "Prof. Mark Johnson",
    email: "mark.johnson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Quantum Physics"],
    bio: "Quantum mechanics instructor with focus on making abstract quantum concepts understandable and practical.",
    rating: 4.8
  },

  // Optics Teachers
  {
    name: "Dr. Sarah Park",
    email: "sarah.park@tutoring.com",
    password: "Teacher123!",
    subjects: ["Optics"],
    bio: "Optics specialist teaching light behavior, reflection, refraction, lenses, and optical instruments.",
    rating: 4.7
  },

  // Modern Physics Teachers
  {
    name: "Dr. Thomas Wright",
    email: "thomas.wright@tutoring.com",
    password: "Teacher123!",
    subjects: ["Modern Physics"],
    bio: "Modern physics expert specializing in relativity, quantum mechanics, atomic physics, and nuclear physics.",
    rating: 4.8
  },

  // Waves & Oscillations Teachers
  {
    name: "Ms. Jessica Green",
    email: "jessica.green@tutoring.com",
    password: "Teacher123!",
    subjects: ["Waves & Oscillations"],
    bio: "Physics tutor specializing in wave motion, sound waves, interference, and harmonic motion concepts.",
    rating: 4.7
  },

  // ==================== CHEMISTRY ====================
  
  // Organic Chemistry Teachers
  {
    name: "Dr. David Kim",
    email: "david.kim@tutoring.com",
    password: "Teacher123!",
    subjects: ["Organic Chemistry", "Biochemistry"],
    bio: "Chemistry and Biology expert with PhD in Biochemistry. Specializes in organic chemistry and molecular biology.",
    rating: 4.9
  },
  {
    name: "Ms. Jennifer Martinez",
    email: "jennifer.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["Organic Chemistry", "General Chemistry"],
    bio: "Chemistry teacher with passion for making science fun. Expert in general and organic chemistry.",
    rating: 4.8
  },
  {
    name: "Prof. Michael Foster",
    email: "michael.foster@tutoring.com",
    password: "Teacher123!",
    subjects: ["Organic Chemistry"],
    bio: "Organic chemistry specialist with expertise in reactions, synthesis, and functional group transformations.",
    rating: 4.7
  },

  // Inorganic Chemistry Teachers
  {
    name: "Dr. Christopher Brown",
    email: "christopher.brown@tutoring.com",
    password: "Teacher123!",
    subjects: ["Inorganic Chemistry", "General Chemistry"],
    bio: "Research chemist with extensive teaching experience. Helps students master chemical reactions and equations.",
    rating: 4.7
  },
  {
    name: "Dr. Nancy Kim",
    email: "nancy.kim@tutoring.com",
    password: "Teacher123!",
    subjects: ["Inorganic Chemistry"],
    bio: "Inorganic chemistry expert specializing in periodic trends, chemical bonding, and coordination compounds.",
    rating: 4.8
  },

  // Physical Chemistry Teachers
  {
    name: "Prof. Richard Davis",
    email: "richard.davis@tutoring.com",
    password: "Teacher123!",
    subjects: ["Physical Chemistry"],
    bio: "Physical chemistry professor with expertise in thermodynamics, kinetics, and quantum chemistry.",
    rating: 4.9
  },
  {
    name: "Dr. Patricia Lee",
    email: "patricia.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["Physical Chemistry"],
    bio: "Physical chemistry specialist focusing on chemical thermodynamics, kinetics, and spectroscopy.",
    rating: 4.8
  },

  // Biochemistry Teachers
  {
    name: "Dr. Kevin Wang",
    email: "kevin.wang@tutoring.com",
    password: "Teacher123!",
    subjects: ["Biochemistry", "Molecular Biology"],
    bio: "Biochemistry expert with research background. Specializes in metabolic pathways and biomolecules.",
    rating: 4.9
  },

  // General Chemistry Teachers
  {
    name: "Prof. Amanda Lee",
    email: "amanda.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["General Chemistry"],
    bio: "Experienced chemistry tutor focusing on exam preparation and lab work. Patient and detail-oriented.",
    rating: 4.6
  },
  {
    name: "Ms. Rachel Adams",
    email: "rachel.adams@tutoring.com",
    password: "Teacher123!",
    subjects: ["General Chemistry"],
    bio: "General chemistry instructor helping students master atomic structure, stoichiometry, and chemical principles.",
    rating: 4.7
  },

  // Analytical Chemistry Teachers
  {
    name: "Dr. Steven White",
    email: "steven.white@tutoring.com",
    password: "Teacher123!",
    subjects: ["Analytical Chemistry"],
    bio: "Analytical chemistry expert specializing in quantitative analysis methods and instrumentation.",
    rating: 4.8
  },
  {
    name: "Prof. Lisa Brown",
    email: "lisa.brown@tutoring.com",
    password: "Teacher123!",
    subjects: ["Analytical Chemistry"],
    bio: "Chemical analysis specialist with expertise in spectroscopy, chromatography, and analytical techniques.",
    rating: 4.7
  },

  // ==================== BIOLOGY ====================
  
  // Cell Biology Teachers
  {
    name: "Dr. Maria Garcia",
    email: "maria.garcia@tutoring.com",
    password: "Teacher123!",
    subjects: ["Cell Biology", "Genetics"],
    bio: "Molecular biologist with PhD. Expert in genetics, cell biology, and biochemistry. Makes biology concepts clear.",
    rating: 4.9
  },
  {
    name: "Prof. John Mitchell",
    email: "john.mitchell@tutoring.com",
    password: "Teacher123!",
    subjects: ["Cell Biology"],
    bio: "Cell biology specialist teaching cell structure, organelles, division, and cellular processes.",
    rating: 4.8
  },

  // Genetics Teachers
  {
    name: "Dr. Sarah Chen",
    email: "sarah.chen@tutoring.com",
    password: "Teacher123!",
    subjects: ["Genetics", "Molecular Biology"],
    bio: "Genetics expert with research background. Specializes in inheritance patterns, DNA, and gene expression.",
    rating: 4.9
  },
  {
    name: "Prof. David Wilson",
    email: "david.wilson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Genetics"],
    bio: "Genetics instructor helping students understand inheritance, genetic disorders, and genetic engineering.",
    rating: 4.8
  },

  // Anatomy & Physiology Teachers
  {
    name: "Dr. Kevin Johnson",
    email: "kevin.johnson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Anatomy & Physiology"],
    bio: "Biology teacher specializing in human anatomy, physiology, and body systems. Helps students excel in AP Biology.",
    rating: 4.8
  },
  {
    name: "Ms. Rachel Green",
    email: "rachel.green@tutoring.com",
    password: "Teacher123!",
    subjects: ["Anatomy & Physiology"],
    bio: "Experienced biology tutor with medical sciences background. Passionate about making anatomy engaging.",
    rating: 4.7
  },

  // Ecology Teachers
  {
    name: "Prof. Linda Park",
    email: "linda.park@tutoring.com",
    password: "Teacher123!",
    subjects: ["Ecology", "Botany"],
    bio: "Ecology and botany expert. Specializes in ecosystems, biodiversity, and plant-environment interactions.",
    rating: 4.8
  },
  {
    name: "Dr. Robert Taylor",
    email: "robert.taylor@tutoring.com",
    password: "Teacher123!",
    subjects: ["Ecology"],
    bio: "Ecology specialist teaching environmental interactions, food webs, and conservation principles.",
    rating: 4.7
  },

  // Microbiology Teachers
  {
    name: "Dr. Anna Martinez",
    email: "anna.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["Microbiology"],
    bio: "Microbiology expert with expertise in bacteria, viruses, and their roles in health and disease.",
    rating: 4.9
  },
  {
    name: "Prof. Michael Clark",
    email: "michael.clark@tutoring.com",
    password: "Teacher123!",
    subjects: ["Microbiology"],
    bio: "Microbiology instructor specializing in microbial structure, growth, and pathogenic mechanisms.",
    rating: 4.8
  },

  // Molecular Biology Teachers
  {
    name: "Dr. Susan Lee",
    email: "susan.lee.bio@tutoring.com",
    password: "Teacher123!",
    subjects: ["Molecular Biology"],
    bio: "Molecular biology researcher teaching DNA replication, transcription, translation, and gene regulation.",
    rating: 4.9
  },

  // Botany Teachers
  {
    name: "Ms. Jessica Miller",
    email: "jessica.miller.bio@tutoring.com",
    password: "Teacher123!",
    subjects: ["Botany"],
    bio: "Botany specialist teaching plant structure, growth, reproduction, and classification systems.",
    rating: 4.7
  },

  // Zoology Teachers
  {
    name: "Dr. Paul Anderson",
    email: "paul.anderson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Zoology"],
    bio: "Zoology expert specializing in animal classification, behavior, and evolutionary relationships.",
    rating: 4.8
  },
  {
    name: "Prof. Catherine Smith",
    email: "catherine.smith@tutoring.com",
    password: "Teacher123!",
    subjects: ["Zoology"],
    bio: "Animal biology instructor teaching animal diversity, physiology, and ecological roles.",
    rating: 4.7
  },

  // ==================== LANGUAGE ARTS ====================
  
  // Grammar Teachers
  {
    name: "Ms. Nicole Adams",
    email: "nicole.adams@tutoring.com",
    password: "Teacher123!",
    subjects: ["Grammar", "Reading Comprehension"],
    bio: "Passionate English tutor helping students improve grammar, reading comprehension, vocabulary, and writing skills.",
    rating: 4.6
  },
  {
    name: "Prof. Daniel Moore",
    email: "daniel.moore@tutoring.com",
    password: "Teacher123!",
    subjects: ["Grammar", "SAT/ACT Prep"],
    bio: "English Language Arts teacher with focus on SAT/ACT preparation, grammar, and academic writing skills.",
    rating: 4.7
  },
  {
    name: "Ms. Laura Brown",
    email: "laura.brown@tutoring.com",
    password: "Teacher123!",
    subjects: ["Grammar"],
    bio: "Grammar specialist helping students master English syntax, punctuation, and sentence structure.",
    rating: 4.6
  },

  // Literature Teachers
  {
    name: "Dr. Elizabeth Taylor",
    email: "elizabeth.taylor@tutoring.com",
    password: "Teacher123!",
    subjects: ["Literature", "Academic Writing"],
    bio: "English Literature PhD with expertise in writing, literature analysis, and critical thinking. 12 years teaching experience.",
    rating: 4.9
  },
  {
    name: "Prof. Richard Johnson",
    email: "richard.johnson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Literature"],
    bio: "Literature professor specializing in literary analysis, themes, and critical reading of various genres.",
    rating: 4.8
  },

  // Creative Writing Teachers
  {
    name: "Ms. Patricia White",
    email: "patricia.white@tutoring.com",
    password: "Teacher123!",
    subjects: ["Creative Writing", "Literature"],
    bio: "Creative writing and English teacher. Specializes in essay writing, creative storytelling, and literature comprehension.",
    rating: 4.8
  },
  {
    name: "Ms. Sarah Davis",
    email: "sarah.davis@tutoring.com",
    password: "Teacher123!",
    subjects: ["Creative Writing"],
    bio: "Creative writing instructor helping students develop fiction, poetry, and storytelling skills.",
    rating: 4.7
  },

  // Academic Writing Teachers
  {
    name: "Dr. Mark Thompson",
    email: "mark.thompson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Academic Writing", "SAT/ACT Prep"],
    bio: "Academic writing specialist focusing on research papers, citations, and scholarly writing standards.",
    rating: 4.8
  },

  // Reading Comprehension Teachers
  {
    name: "Ms. Jennifer Wilson",
    email: "jennifer.wilson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Reading Comprehension"],
    bio: "Reading specialist helping students improve comprehension strategies and critical analysis skills.",
    rating: 4.7
  },

  // SAT/ACT Prep Teachers
  {
    name: "Prof. Robert Green",
    email: "robert.green@tutoring.com",
    password: "Teacher123!",
    subjects: ["SAT/ACT Prep"],
    bio: "Standardized test prep expert with proven strategies for SAT and ACT success.",
    rating: 4.8
  },

  // ==================== SOCIAL STUDIES ====================
  
  // World History Teachers
  {
    name: "Dr. Thomas Wilson",
    email: "thomas.wilson@tutoring.com",
    password: "Teacher123!",
    subjects: ["World History", "Geography"],
    bio: "History professor with expertise in world history, US history, and historical analysis. Makes history come alive.",
    rating: 4.9
  },
  {
    name: "Prof. Susan Clark",
    email: "susan.clark@tutoring.com",
    password: "Teacher123!",
    subjects: ["World History", "European History"],
    bio: "European and American history expert. Helps students understand historical context and improve essay writing.",
    rating: 4.8
  },
  {
    name: "Ms. Laura Taylor",
    email: "laura.taylor@tutoring.com",
    password: "Teacher123!",
    subjects: ["World History", "Ancient History"],
    bio: "Ancient and medieval history specialist. Engaging teaching style that makes complex historical events understandable.",
    rating: 4.7
  },

  // US History Teachers
  {
    name: "Prof. David Martinez",
    email: "david.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["US History"],
    bio: "US History specialist covering colonial era through modern times with focus on key events and figures.",
    rating: 4.8
  },
  {
    name: "Dr. Nancy Anderson",
    email: "nancy.anderson@tutoring.com",
    password: "Teacher123!",
    subjects: ["US History"],
    bio: "American history professor specializing in political, social, and economic developments in US history.",
    rating: 4.7
  },

  // European History Teachers
  {
    name: "Dr. James Wright",
    email: "james.wright@tutoring.com",
    password: "Teacher123!",
    subjects: ["European History"],
    bio: "European history expert covering major civilizations, wars, revolutions, and cultural movements.",
    rating: 4.8
  },

  // Ancient History Teachers
  {
    name: "Prof. Linda Chen",
    email: "linda.chen@tutoring.com",
    password: "Teacher123!",
    subjects: ["Ancient History"],
    bio: "Ancient civilizations specialist teaching Egypt, Greece, Rome, and Mesopotamian cultures.",
    rating: 4.7
  },

  // Geography Teachers
  {
    name: "Dr. Mark Davis",
    email: "mark.davis@tutoring.com",
    password: "Teacher123!",
    subjects: ["Geography"],
    bio: "Physical and human geography expert with field research experience. Specializes in climate, ecosystems, and cultures.",
    rating: 4.8
  },
  {
    name: "Ms. Jessica Miller",
    email: "jessica.miller@tutoring.com",
    password: "Teacher123!",
    subjects: ["Geography"],
    bio: "Geography teacher passionate about world cultures and physical geography. Makes learning geography interactive.",
    rating: 4.7
  },

  // Political Science Teachers
  {
    name: "Prof. Steven Lee",
    email: "steven.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["Political Science"],
    bio: "Political science professor teaching government systems, political theory, and civic engagement.",
    rating: 4.8
  },
  {
    name: "Dr. Patricia Brown",
    email: "patricia.brown@tutoring.com",
    password: "Teacher123!",
    subjects: ["Political Science"],
    bio: "Political science expert specializing in comparative politics, international relations, and political institutions.",
    rating: 4.7
  },

  // ==================== CREATIVE ARTS ====================
  
  // Drawing Teachers
  {
    name: "Ms. Sophie Martin",
    email: "sophie.martin@tutoring.com",
    password: "Teacher123!",
    subjects: ["Drawing", "Painting"],
    bio: "Professional artist and art instructor. Specializes in drawing, painting, digital art, and art history.",
    rating: 4.8
  },
  {
    name: "Mr. Vincent Russo",
    email: "vincent.russo@tutoring.com",
    password: "Teacher123!",
    subjects: ["Drawing"],
    bio: "Art teacher with expertise in various mediums. Helps students develop artistic skills and creative expression.",
    rating: 4.7
  },
  {
    name: "Ms. Emma Collins",
    email: "emma.collins@tutoring.com",
    password: "Teacher123!",
    subjects: ["Drawing"],
    bio: "Drawing instructor teaching perspective, shading, and fundamental drawing techniques.",
    rating: 4.6
  },

  // Painting Teachers
  {
    name: "Ms. Chloe Bennett",
    email: "chloe.bennett@tutoring.com",
    password: "Teacher123!",
    subjects: ["Painting"],
    bio: "Contemporary artist and art tutor. Specializes in portfolio preparation and painting technique development.",
    rating: 4.6
  },
  {
    name: "Prof. Robert Adams",
    email: "robert.adams@tutoring.com",
    password: "Teacher123!",
    subjects: ["Painting"],
    bio: "Painting instructor specializing in watercolor, oil, and acrylic painting techniques.",
    rating: 4.7
  },

  // Digital Art Teachers
  {
    name: "Ms. Lisa Park",
    email: "lisa.park@tutoring.com",
    password: "Teacher123!",
    subjects: ["Digital Art"],
    bio: "Digital artist and instructor teaching Photoshop, Illustrator, and digital painting tools.",
    rating: 4.8
  },
  {
    name: "Mr. Alex Chen",
    email: "alex.chen.art@tutoring.com",
    password: "Teacher123!",
    subjects: ["Digital Art"],
    bio: "Digital art specialist with expertise in graphic design, digital illustration, and creative software.",
    rating: 4.7
  },

  // Music Theory Teachers
  {
    name: "Prof. Marcus Johnson",
    email: "marcus.johnson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Music Theory"],
    bio: "Professional musician and music theory instructor. Teaches composition, music history, and instrument techniques.",
    rating: 4.8
  },
  {
    name: "Ms. Isabella Torres",
    email: "isabella.torres@tutoring.com",
    password: "Teacher123!",
    subjects: ["Music Theory"],
    bio: "Classical and contemporary music teacher. Helps students with music theory, composition, and performance.",
    rating: 4.7
  },

  // Guitar Teachers
  {
    name: "Mr. Oliver Price",
    email: "oliver.price@tutoring.com",
    password: "Teacher123!",
    subjects: ["Guitar", "Music Production"],
    bio: "Multi-instrumentalist and music educator. Specializes in guitar, piano, and music production.",
    rating: 4.6
  },
  {
    name: "Mr. James Wilson",
    email: "james.wilson@tutoring.com",
    password: "Teacher123!",
    subjects: ["Guitar"],
    bio: "Professional guitarist teaching acoustic and electric guitar from beginner to advanced levels.",
    rating: 4.7
  },

  // Piano Teachers
  {
    name: "Ms. Anna Lee",
    email: "anna.lee@tutoring.com",
    password: "Teacher123!",
    subjects: ["Piano"],
    bio: "Piano instructor with classical training. Teaches music reading, technique, and performance skills.",
    rating: 4.8
  },
  {
    name: "Prof. David Kim",
    email: "david.kim.music@tutoring.com",
    password: "Teacher123!",
    subjects: ["Piano"],
    bio: "Piano teacher specializing in classical, jazz, and contemporary piano styles.",
    rating: 4.7
  },

  // Music Production Teachers
  {
    name: "Mr. Ryan Martinez",
    email: "ryan.martinez@tutoring.com",
    password: "Teacher123!",
    subjects: ["Music Production"],
    bio: "Music producer and instructor teaching recording, mixing, and using digital audio workstations.",
    rating: 4.8
  }
];

export const seedTeachersData = async () => {
  try {
    console.log('🌱 Starting teacher data seeding...');
    
    // Connect to database
    await connectDatabase();
    console.log('✅ Connected to database');

    // Helper function to find subject ID by name
    const findSubjectId = async (name: string) => {
      const subject = await Subject.findOne({ name });
      return subject?._id;
    };

    // Create teachers
    console.log('👨‍🏫 Creating teachers...');
    let teacherCount = 0;
    
    for (const teacherData of teachersData) {
      // Check if user already exists
      let user = await User.findOne({ email: teacherData.email });
      
      if (!user) {
        // Create user account
        user = await User.create({
          name: teacherData.name,
          email: teacherData.email,
          password: teacherData.password,
          role: UserRole.TEACHER
        });
        console.log(`  ✓ Created user: ${user.name}`);
      }

      // Check if teacher profile already exists
      let teacher = await Teacher.findOne({ userId: user._id });
      
      if (!teacher) {
        // Get subject IDs
        const subjectIds = await Promise.all(
          teacherData.subjects.map(async (subjectName) => {
            return await findSubjectId(subjectName);
          })
        );
        const validSubjectIds = subjectIds.filter(id => id !== undefined);

        // Create teacher profile
        teacher = await Teacher.create({
          userId: user._id,
          subjects: validSubjectIds,
          bio: teacherData.bio,
          rating: teacherData.rating
        });
        teacherCount++;
        console.log(`  ✓ Created teacher profile: ${teacherData.name} (${teacherData.subjects.join(', ')})`);
      } else {
        console.log(`  ⊙ Teacher profile already exists: ${teacherData.name}`);
      }
    }

    console.log(`\n🎉 Teacher seeding completed successfully!`);
    console.log(`   - Teachers: ${teacherCount} new profiles created`);
    console.log(`   - Total teachers in database: ${teachersData.length}`);
    console.log('\n✨ Teacher data is ready!');

  } catch (error) {
    console.error('❌ Error seeding teacher data:', error);
    throw error;
  }
};

// Run if called directly (when using ts-node)
if (require.main === module) {
  seedTeachersData()
    .then(() => {
      console.log('✅ Teacher seed script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Teacher seed script failed:', error);
      process.exit(1);
    });
}

// Export for use in other modules
export default seedTeachersData;
