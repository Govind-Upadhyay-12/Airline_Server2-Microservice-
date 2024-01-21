import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    BookedFlight: [{
      type: mongoose.Schema.ObjectId,
      ref: "NewAirplane",
    }],
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("User_Schema", User);

export default UserSchema;
