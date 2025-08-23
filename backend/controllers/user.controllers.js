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

export const getalluser = async (req, res) => {
  try {
    const userId = req.auth.sub;
    if (!userId) {
      return res.status(400).json({
        message: "userid not found ",
        success: false,
      });
    }
    const alluser = await User.findOne({ auth0Id: userId });
    if (!alluser) {
      return res.status(400).json({
        message: "userid not found ",
        success: false,
      });
    }
    return res.status(200).json({
      message: "user get success fully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
