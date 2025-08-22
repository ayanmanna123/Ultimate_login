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
     
    const { sub, email, name, picture } = req.auth;  

     
    let user = await User.findOne({ auth0Id: sub });

    if (!user) {
      // Create new user
      user = await User.create({
        auth0Id: sub,
        email,
        fullname: name,
        profilephoto: picture,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User synced successfully",
      user,
    });
  } catch (error) {
    console.error("Save user error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

