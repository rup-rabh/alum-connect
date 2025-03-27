const prisma=require("../utils/prismaClient")

const getInternshipById = async (req, res) => {
    try {
      const internshipId = parseInt(req.params.id)
  
      const internship = await prisma.internship.findUnique({
        where:{id:internshipId},
      })
  
      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }
  
      res.status(200).json(internship);
    } catch (error) {
      console.error("Error fetching internship:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  module.exports={getInternshipById}