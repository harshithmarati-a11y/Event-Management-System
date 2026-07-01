const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const getReport = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalTickets = await Ticket.countDocuments();

    const revenue = await Ticket.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const upcomingEvents = await Event.find()
      .sort({ date: 1 })
      .limit(5);

    res.json({
      totalEvents,
      totalUsers,
      totalTickets,
      totalRevenue:
        revenue.length > 0 ? revenue[0].totalRevenue : 0,
      upcomingEvents,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReport,
};