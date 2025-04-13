const user = require("../models/user");

const seeUser = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;

    const filter = {
      isDeleted: false,
    };

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const users = await user
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");

    const total = await user.countDocuments(filter);

    return res.status(200).json({
      users,
      meta: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in seeUser:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = seeUser;
