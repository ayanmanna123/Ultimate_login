import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("social-login", UserSchema);

export default UserModel;
