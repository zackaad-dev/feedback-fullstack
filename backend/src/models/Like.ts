import mongoose, { Schema } from 'mongoose';

const LikeSchema = new mongoose.Schema({
    user: { type: Number, required: true }, 
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ['post', 'comment'], required: true },
});

LikeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });

export const Like = mongoose.model('Like', LikeSchema);