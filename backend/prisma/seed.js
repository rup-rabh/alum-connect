const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");

async function main() {
    console.log("🌱 Seeding database with upserts and more data...");

    const hashedPassword = await bcrypt.hash("123456", 10);

    // Upsert Alumni Users
    const alumniUser = await prisma.user.upsert({
        where: { email: "alumni@gmail.com" },
        update: {},
        create: {
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
                    pastExperiences: {
                        create: [
                            {
                                company: "Google.",
                                role: "Backend Developer",
                                startDate: new Date("2018-01-01"),
                                endDate: new Date("2020-12-31"),
                                description: "Worked on scalable APIs and microservices using Node.js and PostgreSQL."
                            },
                            {
                                company: "Goldman sachs.",
                                role: "Senior Developer",
                                startDate: new Date("2021-01-01"),
                                description: "Led a team developing enterprise-level solutions in the MERN stack."
                            }
                        ]
                    }
                }
            }
        },
        include: {
            alumni: {
                include: {
                    pastExperiences: true
                }
            }
        }
    });

    console.log("✅ Seeded Alumni User:", alumniUser.email);

    const alumniUser1 = await prisma.user.upsert({
        where: { email: "alum@gmail.com" },
        update: {},
        create: {
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
                    pastExperiences: {
                        create: [
                            {
                                company: "Tata",
                                role: "Product Manager",
                                startDate: new Date("2020-01-01"),
                                endDate: new Date("2023-01-01"),
                                description:
                                    "Specialized in launching new products and leading cross-functional teams.",
                            },
                        ],
                    },
                },
            },
        },
        include: { alumni: true },
    });

    console.log("✅ Seeded Alumni User:", alumniUser1.email);

    const alumniUser2 = await prisma.user.upsert({
        where: { email: "good@gmail.com" },
        update: {},
        create: {
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
                    pastExperiences: {
                        create: [
                            {
                                company: "Bata",
                                role: "Engineering Manager",
                                startDate: new Date("2018-01-01"),
                                endDate: new Date("2023-01-01"),
                                description:
                                    "Led backend engineering teams and worked on scalable microservices architecture.",
                            },
                        ],
                    },
                },
            },
        },
        include: { alumni: true },
    });

    console.log("✅ Seeded Alumni User:", alumniUser2.email);

    // Upsert Student Users
    const studentUser = await prisma.user.upsert({
        where: { email: "student@gmail.com" },
        update: {},
        create: {
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
                    experiences: {
                        create: [
                            {
                                title: "Web Development Intern",
                                description: "Developed responsive websites using HTML, CSS, and JavaScript.",
                                techStacks: ["HTML", "CSS", "JavaScript"],
                                startDate: new Date("2024-06-01"),
                                endDate: new Date("2024-08-31"),
                            },
                        ],
                    },
                },
            },
        },
        include: {
            student: {
                include: {
                    experiences: true
                }
            }
        },
    });

    console.log("✅ Seeded Student User:", studentUser.email);

    const studentUser2 = await prisma.user.upsert({
        where: { email: "student2@gmail.com" },
        update: {},
        create: {
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
                    experiences: {
                        create: [
                            {
                                title: "Backend Development Trainee",
                                description: "Learned about server-side logic using Node.js and Express.",
                                techStacks: ["Node.js", "Express", "MongoDB"],
                                startDate: new Date("2024-07-01"),
                                endDate: new Date("2024-09-30"),
                            },
                            {
                                title: "Open Source Contributor",
                                description: "Contributed to an open-source project focused on API development.",
                                techStacks: ["Python", "Flask", "REST API"],
                                startDate: new Date("2024-10-01"),
                            },
                        ],
                    },
                },
            },
        },
        include: {
            student: {
                include: {
                    experiences: true
                }
            }
        },
    });

    console.log("✅ Seeded Student User:", studentUser2.email);

    await prisma.internApplication.deleteMany();
    await prisma.internship.deleteMany();

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
            },
        ],
    });

    await prisma.eventLink.deleteMany();
    await prisma.event.deleteMany();

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
        const event = await prisma.event.create({
            data: item.data,
        });

        await prisma.eventLink.createMany({
            data: item.links.map((link) => ({
                ...link,
                eventId: event.id,
            })),
        });
    }

    // Ensure every table has at least one record (if not already created)
        // --- MENTORS AND MENTORSHIPS SEEDING ---

    // Create mentors for each alumni user
    const mentors = [];

    // Mentor 1 (for alumniUser)
    const mentor1 = await prisma.mentor.create({
      data: {
        userId: alumniUser.alumni.userId,
        keywords: ["SOFTWARE", "BLOCKCHAIN"],
        experience: 5,
        interaction: "HIGH",
        maxMentees: 10,
        currentMentees: 3,
        levelsOfMentees: ["SECOND_YEAR", "FOURTH_YEAR"],
        interests: ["PRO_BONO_HELP", "MENTORING_AND_PARTNERSHIP"],
        linkedinProfile: "https://www.linkedin.com/in/johndoe/",
        currentOrganization: "Tech Corp",
        passingYear: 2016,
      },
      include: { user: true },
    });
    mentors.push(mentor1);
    console.log("Φ created mentor!", mentor1.id);

    // Mentor 2 (for alumniUser1)
    const mentor2 = await prisma.mentor.create({
      data: {
        userId: alumniUser1.alumni.userId,
        keywords: ["PRODUCT_MANAGEMENT", "FINANCE"],
        experience: 3,
        interaction: "MODERATE",
        maxMentees: 5,
        currentMentees: 1,
        levelsOfMentees: ["THIRD_YEAR"],
        interests: ["FLOATING_OWN_PROJECTS"],
        linkedinProfile: "https://www.linkedin.com/in/doejana/",
        currentOrganization: "Tata",
        passingYear: 2018,
      },
      include: { user: true },
    });
    mentors.push(mentor2);
    console.log("Φ created mentor!", mentor2.id);

    // Mentor 3 (for alumniUser2)
    const mentor3 = await prisma.mentor.create({
      data: {
        userId: alumniUser2.alumni.userId,
        keywords: ["PRODUCT_MANAGEMENT", "OPERATIONS"],
        experience: 5,
        interaction: "VERY_LOW",
        maxMentees: 8,
        currentMentees: 2,
        levelsOfMentees: ["FOURTH_YEAR","FIFTH_YEAR"],
        interests: ["HELPING_IN_NETWORKING", "INVESTING"],
        linkedinProfile: "https://www.linkedin.com/in/goodman/",
        currentOrganization: "Bata",
        passingYear: 2015,
      },
      include: { user: true },
    });
    mentors.push(mentor3);
    console.log("Φ created mentor!", mentor3.id);

    // --- Create mentorships (linking mentors to students) ---

    const mentorships = [
      {
        mentorId: mentor1.id,
        menteeId: studentUser.student.userId,
        status: "PENDING",
      },
      {
        mentorId: mentor2.id,
        menteeId: studentUser2.student.userId,
        status: "ACTIVE",
      },
      {
        mentorId: mentor3.id,
        menteeId: studentUser.student.userId,
        status: "REJECTED",
      },
    ];

    for (const mentorshipData of mentorships) {
      const mentorShip = await prisma.mentorship.create({
        data: mentorshipData,
        include: { mentor: true },
      });
      console.log("🎉 created mentorship!", "status", mentorShip.status);
    }


  }

  main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });