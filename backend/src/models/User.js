const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./Counter");

const UserSchema = new mongoose.Schema(
  {
    uid: { type: Number, unique: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    avatar_url: { type: String, required: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      user.uid = counter ? counter.seq : 1;
    } catch (error) {
      return next(error);
    }
  }

  if (!this.isModified("password_hash")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
