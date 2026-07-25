import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { Counter } from "../models/Counter";

dotenv.config();
const envFile =
  process.env.NODE_ENV === "production" ? "../.env" : "../.env.development";
dotenv.config({ path: envFile });

const seedDatabase = async () => {
  try {
    console.log("🌱 Connecting to MongoDB for seeding...");
    await connectDB();

    console.log("🧹 Cleaning up existing database collections...");
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    await Counter.deleteMany({});

    console.log("👤 Creating seed users...");
    const user1 = await User.create({
      email: "johndoe@example.com",
      username: "johndoe",
      password_hash: "password123",
    });

    const user2 = await User.create({
      email: "janedoe@example.com",
      username: "janedoe",
      password_hash: "password123",
    });

    const user3 = await User.create({
      email: "alex@example.com",
      username: "alex_dev",
      password_hash: "password123",
    });

    console.log("📝 Creating seed posts...");
    const post1 = await Post.create({
      title: "Welcome to Feedback!",
      content:
        "This is our brand new feedback and discussion platform built with React 19, Express, TypeScript, and MongoDB. Feel free to share your thoughts, posts, and replies below!",
      author: {
        uid: (user1 as any).uid,
        username: user1.username,
      },
      likes_count: 2,
      comment_count: 2,
    });

    const post2 = await Post.create({
      title: "Building Scalable APIs with Express & TypeScript",
      content:
        "Separating application logic into dedicated routes, controllers, and services makes codebases significantly cleaner, easier to maintain, and straightforward to unit test.",
      author: {
        uid: (user2 as any).uid,
        username: user2.username,
      },
      likes_count: 1,
      comment_count: 1,
    });

    const post3 = await Post.create({
      title: "Design Systems & High-Contrast Aesthetics",
      content:
        "Strict monochrome palettes with high-contrast elements give web applications a refined, state-of-the-art feel that is easy on the eyes in both light and dark modes.",
      author: {
        uid: (user3 as any).uid,
        username: user3.username,
      },
      likes_count: 3,
      comment_count: 0,
    });

    console.log("💬 Creating seed comments...");
    const comment1 = await Comment.create({
      post: post1._id,
      content: "Awesome platform! Excited to use this for community discussions.",
      author: {
        uid: (user2 as any).uid,
        username: user2.username,
      },
      likes_count: 1,
    });

    const comment2 = await Comment.create({
      post: post1._id,
      content: "Love the clean black and white UI design!",
      author: {
        uid: (user3 as any).uid,
        username: user3.username,
      },
      likes_count: 1,
    });

    const comment3 = await Comment.create({
      post: post2._id,
      content: "Great breakdown of the layered architecture pattern.",
      author: {
        uid: (user1 as any).uid,
        username: user1.username,
      },
      likes_count: 0,
    });

    console.log("❤️ Creating seed likes...");
    // Likes on post 1
    await Like.create({ user: (user2 as any).uid, targetId: post1._id, targetType: "post" });
    await Like.create({ user: (user3 as any).uid, targetId: post1._id, targetType: "post" });

    // Like on post 2
    await Like.create({ user: (user1 as any).uid, targetId: post2._id, targetType: "post" });

    // Likes on post 3
    await Like.create({ user: (user1 as any).uid, targetId: post3._id, targetType: "post" });
    await Like.create({ user: (user2 as any).uid, targetId: post3._id, targetType: "post" });
    await Like.create({ user: (user3 as any).uid, targetId: post3._id, targetType: "post" });

    // Likes on comments
    await Like.create({ user: (user1 as any).uid, targetId: comment1._id, targetType: "comment" });
    await Like.create({ user: (user2 as any).uid, targetId: comment2._id, targetType: "comment" });

    console.log("✅ Database seeding completed successfully!");
    console.log("-----------------------------------------");
    console.log("Sample accounts created (password: password123):");
    console.log("  - johndoe@example.com");
    console.log("  - janedoe@example.com");
    console.log("  - alex@example.com");
    console.log("-----------------------------------------");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
