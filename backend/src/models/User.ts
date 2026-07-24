import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Counter } from './Counter';

const UserSchema = new mongoose.Schema({
  uid: { type: Number, unique: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password_hash: { type: String, required: true },
  avatar_url: { type: String, required: false },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = this as any;

  if (user.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      user.uid = counter?.seq;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return next(error);
    }
  }


  if (!this.isModified('password_hash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

export const User = mongoose.model('User', UserSchema);
