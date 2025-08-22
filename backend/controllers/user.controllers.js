import User from "../model/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const userId = req.auth.sub; // ✅ Auth0 user id comes from token
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
