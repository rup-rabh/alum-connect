const prisma = require("../utils/prismaClient");

const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await prisma.event.findMany({
      where: {
        type: "UPCOMING",
      },
      orderBy: {
        date: "asc", // shows upcoming events in order
      },
      include: {
        links: true,
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: upcomingEvents,
    });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching upcoming events.",
    });
  }
};

const getPastEvents = async (req, res) => {
  try {
    const pastEvents = await prisma.event.findMany({
      where: {
        type: "PAST",
      },
      orderBy: {
        date: "desc", // latest past event first
      },
      include: {
        links: true,
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: pastEvents,
    });
  } catch (error) {
    console.error("Error fetching past events:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching past events.",
    });
  }
};


const registerForUpcomingEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({
      success: false,
      message: "userId and eventId are required.",
    });
  }

  try {
    // Check if the event is UPCOMING
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (event.type !== "UPCOMING") {
      return res.status(400).json({
        success: false,
        message: "Cannot register for a past event.",
      });
    }

    // Create registration
    const registration = await prisma.userEvent.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } },
      },
    });

    // Update attendee count
    await prisma.event.update({
      where: { id: eventId },
      data: {
        attendessCount: { increment: 1 },
      },
    });

    res.status(201).json({
      success: true,
      message: "Successfully registered for the event.",
      data: registration,
    });
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation (duplicate registration)
      return res.status(409).json({
        success: false,
        message: "You have already registered for this event.",
      });
    }

    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during registration.",
    });
  }
};


module.exports = {
  getUpcomingEvents,
  getPastEvents,
  regsiterForUpcomingEvent
};
