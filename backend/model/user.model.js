import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true },  
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    profilephoto: { type: String, default: "" },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
