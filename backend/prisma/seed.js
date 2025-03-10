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
  await prisma.user.deleteMany();

  console.log("🗑️ Deleted existing users and dependent records");

  // Hash passwords
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Create Alumni User
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
  console.log("👨‍🎓 Created alumni user");

  // Create Student User
  const studentUser = await prisma.user.create({
    data: {
      username: "student",
      email: "student@gmail.com",
      password: hashedPassword,
      role: "STUDENT",
      student: {
        create: {
          fullName:"Student",
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
  console.log("🎓 Created student user");

  // Add Alumni Experience
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
  console.log("💼 Added alumni experience");

  // Add Student Experience
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
  console.log("🛠️ Added student experience");

  // Post an Internship
  await prisma.internship.create({
    data: {
      
      company: "Tech Corp",
      title: "Frontend Developer Intern",
      jd: "Build UI components using React and TailwindCSS.",
      domain: "FRONTEND",
      location: "REMOTE",
      compensation: "$1000/month",
      duration: "3 months",
      startTime: new Date("2025-06-01"),
      endTime: new Date("2025-09-01"),
      criteria: "Final year students with frontend experience",
      weeklyHours: "20 hours",
      postedById: alumniUser.alumni.id,
    },
  });

  console.log("📢 Posted internship");

  const mentor = await prisma.mentor.create({
    data:{
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
    },include:{user:true},
  })
  
  console.log("Φ created mentor!",mentor.id);
  const mentorShip = await prisma.mentorship.create({
      data :{
      mentorId  : mentor.id,
      menteeId  :studentUser.student.userId,
      status  :  "PENDING"
      }, include : {mentor: true}
    }
  )
  
  console.log("🎉 created mentorship!", "status ", mentorShip.status);
  const mentorShipAccepted = await prisma.mentorship.update({
    where: { id: mentorShip.id },
    data: {
      status: "ACTIVE", 
      mentor: {
        update: {
          currentMentees: { increment: 1 }, 
        },
      },
    },
  });
  console.log("🎉 mentorship accepted!", "status ", mentorShipAccepted.status);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
