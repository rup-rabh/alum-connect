const { z } = require("zod");

const InteractionLevel = z.enum(["VERY_LOW", "LOW", "HIGH"]);
const MentorshipStatus = z.enum(["PENDING", "ACCEPTED", "REJECTED"]);
const MenteeLevel = z.enum(["SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR","FIFTH_YEAR","RESEARCH"]);
const MentorInterest = z.enum([
  "PRO_BONO_HELP",
  "MENTORING_AND_PARTNERSHIP",
  "INVESTING",
  "NETWORKING",
  "HELPING_IN_NETWORKING",
  "FLOATING_OWN_PROJECTS",
]);
const Domain = z.enum([
  "SOFTWARE",
  "FRONTEND",
  "BACKEND",
  "PRODUCT_MANAGEMENT",
  "WEB_DEVELOPMENT",
  "MOBILE_DEVELOPMENT",
  "MACHINE_LEARNING",
  "DATA_SCIENCE",
  "BLOCKCHAIN",
  "CLOUD_COMPUTING",
  "CYBERSECURITY",
]);
//////////////////////////// MENTOR
const MentorSchema = z.object({
  // id: z.number().int().positive(), 
  userId: z.number().int().positive(), 
  keywords: z.array(Domain), 
  experience: z.number().int().positive().optional(), 
  interaction: InteractionLevel.optional(), 
  maxMentees: z.number().int().positive().default(5), 
  currentMentees: z.number().int().nonnegative().default(0), 
  levelsOfMentees: z.array(MenteeLevel), // Allowed mentee levels
  interests: z.array(MentorInterest), // Mentorship interests
  linkedinProfile: z.string().url().optional(), 
  currentOrganization: z.string().optional(), 
  passingYear: z.number().int().positive().optional(), 
  mentorships: z.array(z.any()).optional(), // Placeholder for Mentorship relation (can be refined further)
});

///////////////MENTORSHIP

const MentorshipSchema = z.object({
  // id: z.number().int().positive(), 
  mentorId: z.number().int().positive(), 
  menteeId: z.number().int().positive(), 
  createdAt: z.date().optional().refine((date) => date <= new Date(), {message: "Creation date cannot be in the future.",}),
  // Creation timestamp (optional, defaults to now)
  status: MentorshipStatus.default("PENDING"), // Status of mentorship request (default is PENDING)
});
const MentorshipsSchema = z
  .array(MentorshipSchema)
  .min(0, { message: "Enter atleast one experience." });

module.exports= {MentorSchema,MentorshipSchema,MentorshipsSchema};
