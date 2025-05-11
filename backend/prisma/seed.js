const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");

async function main() {
  console.log("🌱 Seeding database...");

  // Delete existing data
  await prisma.internApplication.deleteMany();
  await prisma.internship.deleteMany();
  await prisma.alumniExperience.deleteMany();
  await prisma.alumni.deleteMany();
  await prisma.studentExperience.deleteMany();
  await prisma.student.deleteMany();
  await prisma.mentorship.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.eventLink.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️ Deleted existing data");

  const hashedPassword = await bcrypt.hash("123456", 10);

  // Create Alumni Users
  const alumniUser = await prisma.user.create({
    data: {
      username: "alumni",
      email: "alumni@gmail.com",
      password: hashedPassword,
      role: "ALUMNI",
      alumni: {
        create: {
          fullName: "John Doe",
          presentCompany: "Tech Corp",
          yearsOfExperience: 5,
          domain: "SOFTWARE",
        },
      },
    },
    include: { alumni: true },
  });

  const alumniUser1 = await prisma.user.create({
    data: {
      username: "alum",
      email: "alum@gmail.com",
      password: hashedPassword,
      role: "ALUMNI",
      alumni: {
        create: {
          fullName: "Doe Jana",
          presentCompany: "Tata",
          yearsOfExperience: 3,
          domain: "PRODUCT_MANAGEMENT",
        },
      },
    },
    include: { alumni: true },
  });

  const alumniUser2 = await prisma.user.create({
    data: {
      username: "goodMentor",
      email: "good@gmail.com",
      password: hashedPassword,
      role: "ALUMNI",
      alumni: {
        create: {
          fullName: "Good Man",
          presentCompany: "Bata",
          yearsOfExperience: 5,
          domain: "PRODUCT_MANAGEMENT",
        },
      },
    },
    include: { alumni: true },
  });

  // Create Student Users
  const studentUser = await prisma.user.create({
    data: {
      username: "student",
      email: "student@gmail.com",
      password: hashedPassword,
      role: "STUDENT",
      student: {
        create: {
          fullName: "Student",
          cgpa: 3.8,
          department: "Computer Science",
          rollno: "CS2025001",
          cv: "https://drive.google.com/example-resume",
          domain: "FRONTEND",
        },
      },
    },
    include: { student: true },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      username: "student2",
      email: "student2@gmail.com",
      password: hashedPassword,
      role: "STUDENT",
      student: {
        create: {
          fullName: "Student Two",
          cgpa: 3.7,
          department: "Information Technology",
          rollno: "IT2025002",
          cv: "https://drive.google.com/example-resume-2",
          domain: "BACKEND",
        },
      },
    },
    include: { student: true },
  });

  // Add Experiences
  await prisma.alumniExperience.create({
    data: {
      company: "Tech Corp",
      role: "Software Engineer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-01-01"),
      description: "Worked on full-stack applications",
      alumniId: alumniUser.alumni.id,
    },
  });

  await prisma.studentExperience.create({
    data: {
      title: "Frontend Intern",
      description: "Developed React components for a dashboard.",
      techStacks: ["React", "JavaScript", "TailwindCSS"],
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-09-01"),
      studentId: studentUser.student.id,
    },
  });

  // Create Internships
  await prisma.internship.createMany({
    data: [
      {
        title: "Frontend Developer Intern",
        company: "Tech Corp",
        jd: "Work with React and Tailwind to build scalable UIs.",
        jdType: "TEXT",
        domain: "FRONTEND",
        location: "Remote",
        compensation: "₹10,000/month",
        duration: "3 months",
        startTime: new Date("2025-05-01"),
        endTime: new Date("2025-07-31"),
        criteria: "2nd year and above",
        weeklyHours: "10-15 hours",
        postedById: alumniUser.alumni.id,
      },
      {
        title: "Product Management Intern",
        company: "Tata",
        jd: "Assist in product planning, user research, and roadmap creation.",
        jdType: "TEXT",
        domain: "PRODUCT_MANAGEMENT",
        location: "Mumbai",
        compensation: "₹15,000/month",
        duration: "2 months",
        startTime: new Date("2025-06-01"),
        endTime: new Date("2025-07-31"),
        criteria: "3rd year only",
        weeklyHours: "20 hours",
        postedById: alumniUser1.alumni.id,
      },
      {
        title: "Software Engineering Intern",
        company: "Bata",
        jd: "Full-stack development role with exposure to cloud deployments.",
        jdType: "TEXT",
        domain: "SOFTWARE",
        location: "Online",
        compensation: "₹12,000/month",
        duration: "6 weeks",
        startTime: new Date("2025-05-15"),
        endTime: new Date("2025-06-30"),
        criteria: "All years eligible",
        weeklyHours: "15-20 hours",
        postedById: alumniUser2.alumni.id,
      },
      {
        title: "Backend Intern - Node.js",
        company: "Infosys",
        jd: "https://www.example.com/jobs/backend-nodejs-internship",
        jdType: "URL",
        domain: "BACKEND",
        location: "Hyderabad",
        compensation: "₹8,000/month",
        duration: "2 months",
        startTime: new Date("2025-06-01"),
        endTime: new Date("2025-07-31"),
        criteria: "3rd year and above",
        weeklyHours: "12-15 hours",
        postedById: alumniUser.alumni.id,
      },
      {
        title: "Cloud & DevOps Intern",
        company: "Google Cloud India",
        jd: "https://careers.google.com/jobs/results/123456-cloud-intern/",
        jdType: "URL",
        domain: "CLOUD_COMPUTING",
        location: "Remote",
        compensation: "₹18,000/month",
        duration: "3 months",
        startTime: new Date("2025-05-20"),
        endTime: new Date("2025-08-20"),
        criteria: "Final year students",
        weeklyHours: "15 hours",
        postedById: alumniUser1.alumni.id,
      },
      {
        title: "Cybersecurity Research Intern",
        company: "QuickSecure",
        jd: "Hands-on research internship on penetration testing, threat modeling, and zero-day analysis.",
        jdType: "TEXT",
        domain: "CYBERSECURITY",
        location: "Delhi",
        compensation: "₹14,000/month",
        duration: "2 months",
        startTime: new Date("2025-06-10"),
        endTime: new Date("2025-08-10"),
        criteria: "Students with basic networking knowledge",
        weeklyHours: "10 hours",
        postedById: alumniUser2.alumni.id,
      },
      {
        title: "Machine Learning Intern",
        company: "OpenAI India",
        jd: "https://openai.com/careers/machine-learning-intern",
        jdType: "URL",
        domain: "MACHINE_LEARNING",
        location: "Remote",
        compensation: "₹25,000/month",
        duration: "2 months",
        startTime: new Date("2025-07-01"),
        endTime: new Date("2025-08-31"),
        criteria: "Final year students with ML background",
        weeklyHours: "20 hours",
        postedById: alumniUser.alumni.id,
      }
    ],
  });

  // Create Events with Links
  const eventsWithLinks = [
    {
      data: {
        title: "AI & Future Careers Webinar",
        description: "Explore how AI is shaping job roles and skills of the future.",
        date: new Date("2025-06-05"),
        startTime: new Date("2025-06-05T17:00:00"),
        endTime: new Date("2025-06-05T18:30:00"),
        location: "https://zoom.us/j/ai-webinar",
        mode: "VIRTUAL",
        type: "UPCOMING",
        attendeesCount: 3,
      },
      links: [
        { label: "Poster", url: "https://indusuni.ac.in/gif/Future-Career-Scope-of-AI.png" },
        { label: "Join Link", url: "https://zoom.us/j/ai-webinar" },
      ],
    },
    {
      data: {
        title: "Startup Pitch Fest",
        description: "Watch student startups pitch their ideas to real investors.",
        date: new Date("2025-06-15"),
        startTime: new Date("2025-06-15T14:00:00"),
        endTime: new Date("2025-06-15T17:00:00"),
        location: "Innovation Hub, Main Campus",
        mode: "OFFLINE",
        type: "UPCOMING",
        attendeesCount: 7,
      },
      links: [
        { label: "Event Poster", url: "https://example.com/startup-poster.png" },
        { label: "Pitch Deck Samples", url: "https://example.com/pitch-decks.zip" },
      ],
    },
    {
      data: {
        title: "Build Your Portfolio Session",
        description: "Get expert tips on making your dev/design portfolio stand out.",
        date: new Date("2025-03-25"),
        startTime: new Date("2025-03-25T11:00:00"),
        endTime: new Date("2025-03-25T13:00:00"),
        location: "Hybrid Link: https://meet.google.com/portfolio",
        mode: "HYBRID",
        type: "PAST",
        attendeesCount: 12,
      },
      links: [
        { label: "Slides", url: "https://slidesgo.com/theme/formal-and-professional-portfolio#search-Portfolio&position-1&results-602" },
        { label: "Recording", url: "https://example.com/portfolio-recording" },
      ],
    },
    {
      data: {
        title: "Cloud Certification AMA",
        description: "Live Q&A with certified cloud engineers about AWS, GCP, and Azure.",
        date: new Date("2025-02-18"),
        startTime: new Date("2025-02-18T16:00:00"),
        endTime: new Date("2025-02-18T17:30:00"),
        location: "Tech Hall, Room 3",
        mode: "OFFLINE",
        type: "PAST",
        attendeesCount: 20,
      },
      links: [
        { label: "FAQ PDF", url: "https://example.com/cloud-ama-faq.pdf" },
        { label: "Event Poster", url: "https://daxg39y63pxwu.cloudfront.net/images/blog/google-cloud-certifications/Google_Cloud_Certifications.webp" },
      ],
    },
  ];

  for (const item of eventsWithLinks) {
    const event = await prisma.event.create({ data: item.data });
    await prisma.eventLink.createMany({
      data: item.links.map(link => ({ ...link, eventId: event.id })),
    });
  }

  // Create Mentor
  const mentor = await prisma.mentor.create({
    data: {
      userId: alumniUser.alumni.userId,
      keywords: ["SOFTWARE", "BLOCKCHAIN"],
      experience: 5,
      interaction: "HIGH",
      maxMentees: 10,
      currentMentees: 3,
      levelsOfMentees: ["SECOND_YEAR", "FOURTH_YEAR"],
      interests: ["PRO_BONO_HELP", "MENTORING_AND_PARTNERSHIP"],
      linkedinProfile: "https://www.linkedin.com/in/example-profile/",
      currentOrganization: "Google",
      passingYear: 2016
    },
    include: { user: true },
  });

  // Create Mentorship
  const mentorship = await prisma.mentorship.create({
    data: {
      mentorId: mentor.id,
      menteeId: studentUser.student.userId,
      status: "PENDING"
    },
    include: { mentor: true }
  });

  // Update Mentorship to Active
  await prisma.mentorship.update({
    where: { id: mentorship.id },
    data: {
      status: "ACTIVE",
      mentor: {
        update: { currentMentees: { increment: 1 } }
      }
    }
  });

  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });