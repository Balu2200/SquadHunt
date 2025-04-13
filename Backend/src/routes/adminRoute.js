const express = require("express");
const adminRouter = express.Router();
const { verifyToken, isAdmin } = require("../middleware/adminMiddleware");
const User = require("../models/user");
const Opportunity = require("../models/oppurtunity");


adminRouter.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const { role, name, email, page = 1, limit = 10 } = req.query;
    const query = { isDeleted: { $ne: true } };

    if (role) query.role = role;
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");

    res.json({
      data: users,
      meta: { total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.get("/opportunities", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { isDeleted: { $ne: true } };

    if (status) query.status = status;

    const total = await Opportunity.countDocuments(query);
    const items = await Opportunity.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: items,
      meta: { total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("Error fetching opportunities:", err);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.delete("/user/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required" });
    const user = await User.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User soft-deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
});



adminRouter.patch(
  "/opportunity/:id/status",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await Opportunity.findOneAndUpdate(
        { _id: id, isDeleted: { $ne: true } },
        { status },
        { new: true }
      );

      if (!updated)
        return res
          .status(404)
          .json({ message: "Opportunity not found or deleted" });

      res.json({ message: "Status updated", data: updated });
    } catch (err) {
      console.error("Error updating opportunity status:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = adminRouter;
