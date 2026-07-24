import mongoose from 'mongoose';

export interface IComment {
  id: string;
  post: string;
  content: string;
  author: {
    uid: number | null | undefined;
    username: string | null | undefined;
  };
  likes_count: number;
  createdAt: Date;
  updatedAt: Date;
  likedByCurrentUser?: boolean;
}

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true, trim: true },
  likes_count: { type: Number, required: true, default: 0 },
  author: {
    uid: { type: Number, required: true },
    username: { type: String, required: true }
  },

}, { timestamps: true });

CommentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Comment = mongoose.model('Comment', CommentSchema);