import User from "../model/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const userId = req.auth.sub;
    const { fullname } = req.body;

    if (!fullname) {
      return res.status(400).json({
        success: false,
        message: "Fullname is required",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { auth0Id: userId }, // ✅ link Auth0 user to DB
      { $set: { fullname } },
      { new: true, upsert: true } // create if doesn't exist
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Fullname updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const saveUser = async (req, res) => {
  try {
    // Get user info from Auth0 token (already decoded by middleware)
    const { sub, email, name, picture } = req.auth.payload;

    if (!email) {
      return res.status(400).json({ message: "No email found in token" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        auth0Id: sub,
        email,
        fullname: name,
        photo: picture,
      });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ saveUser error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
