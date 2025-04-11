const prisma = require("../utils/prismaClient");

const getUpcomingEvents = async (req, res) => {
  try {
    const userId = req.userId;

    const events = await prisma.event.findMany({
      where: {
        type: "UPCOMING",
      },
      orderBy: {
        startTime: "asc",
      },
      include: {
        registrations: {
          where: { userId },
          select: { id: true },
        },
        links:true
      },
    });

    const formatted = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      mode: event.mode,
      attendeesCount: event.attendeesCount,
      registered: event.registrations.length > 0,
      links: event.links.map(link => ({
        id: link.id,
        label: link.label,
        url: link.url,
      })),
    }));

    res.json({
      data:formatted
    });
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getPastEvents = async (req, res) => {
  try {
    const userId = req.userId;

    const events = await prisma.event.findMany({
      where: {
        type: "PAST",
      },
      orderBy: {
        startTime: "desc",
      },
      include: {
        registrations: {
          where: { userId },
          select: { id: true },
        },
        links:true
      },
    });

    const formatted = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      mode: event.mode,
      attendeesCount: event.attendeesCount,
      registered: event.registrations.length > 0,
      links: event.links.map(link => ({
        id: link.id,
        label: link.label,
        url: link.url,
      })),
    }));

    res.json({
      data:formatted
    });
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const registerForUpcomingEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId=req.userId;

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
        attendeesCount: { increment: 1 },
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
  registerForUpcomingEvent,
};
