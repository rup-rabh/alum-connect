const prisma = require("../utils/prismaClient")

//so what should the features for mentors?
// 1. Find mentors , with filters (later maybe)
// 2. Connect with mentors
// 3. Grouping with mentors should be another features of groups maybe

const getAllMentors = async (req,res)=>{
    try {
        const mentors = await prisma.mentor.findMany();
        return res.status(201).json({mentors});
    } catch (error) {
        console.error("Error in getAllMentors:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports ={
    getAllMentors,
}