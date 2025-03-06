const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");

async function main() {
  console.log("🌱 Seeding database...");

    await prisma.internApplication.deleteMany();
    await prisma.internship.deleteMany(); 
    await prisma.alumniExperience.deleteMany();
    await prisma.alumni.deleteMany(); 
    await prisma.studentExperience.deleteMany();
    await prisma.student.deleteMany(); 
    await prisma.user.deleteMany(); 

  console.log("🗑️ Deleted existing users and dependent records");

//   const passwordHash = await bcrypt.hash("password123", 10);

//   // ✅ Create Alumni Users and their Details
//   const alumni1 = await prisma.user.create({
//     data: {
//       username: "alumni1",
//       email: "alumni1@example.com",
//       password: passwordHash,
//       role: "ALUMNI",
//       alumni: {
//         create: {
//           fullName: "Alumni_1",
//           presentCompany: "Google",
//           yearsOfExperience: 5,
//           domain: "SOFTWARE",
//         },
//       },
//     },
//     include: { alumni: true },
//   });

//   const alumni2 = await prisma.user.create({
//     data: {
//       username: "alumni_two",
//       email: "alumni2@example.com",
//       password: passwordHash,
//       role: "ALUMNI",
//       alumni: {
//         create: {
//           fullName: "Alumni_2",
//           presentCompany: "Microsoft",
//           yearsOfExperience: 7,
//           domain: "DATA_SCIENCE",
//         },
//       },
//     },
//     include: { alumni: true },
//   });

//   console.log("✅ Created Alumni Users");

//   // ✅ Create Student Users
//   const student1 = await prisma.user.create({
//     data: {
//       username: "student1",
//       email: "student1@example.com",
//       password: passwordHash,
//       role: "STUDENT",
//       student: {
//         create: {
//           cgpa: 3.8,
//           cv: "https://drive.google.com/student1-resume",
//           department: "Computer Science",
//           rollno: "CS101",
//           domain: "SOFTWARE",
//         },
//       },
//     },
//     include: { student: true },
//   });

//   const student2 = await prisma.user.create({
//     data: {
//       username: "student2",
//       email: "student2@example.com",
//       password: passwordHash,
//       role: "STUDENT",
//       student: {
//         create: {
//           cgpa: 3.6,
//           cv: "https://drive.google.com/student2-resume",
//           department: "Data Science",
//           rollno: "DS102",
//           domain: "DATA_SCIENCE",
//         },
//       },
//     },
//     include: { student: true },
//   });

//   console.log("✅ Created Student Users");

//   // ✅ Create Internships posted by Alumni
//   const internship1 = await prisma.internship.create({
//     data: {
//       title: "Backend Development Internship",
//       jd: "Work on backend APIs and database optimizations.",
//       domain: "SOFTWARE",
//       location: "Remote",
//       compensation: "$2000/month",
//       duration: "3 months",
//       startTime: new Date("2025-06-01"),
//       endTime: new Date("2025-09-01"),
//       criteria: "Final year students only",
//       weeklyHours: "20-30",
//       closed: false,
//       postedById: alumni1.alumni.id,
//     },
//   });

//   const internship2 = await prisma.internship.create({
//     data: {
//       title: "Data Science Internship",
//       jd: "Analyze data and build machine learning models.",
//       domain: "DATA_SCIENCE",
//       location: "San Francisco, CA",
//       compensation: "$3000/month",
//       duration: "4 months",
//       startTime: new Date("2025-07-01"),
//       endTime: new Date("2025-10-01"),
//       criteria: "3rd & 4th-year students with Python experience",
//       weeklyHours: "15-25",
//       closed: false,
//       postedById: alumni2.alumni.id,
//     },
//   });

//   console.log("✅ Created Internships");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
