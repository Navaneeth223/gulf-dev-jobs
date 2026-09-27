import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import type { UserRole } from "@/types/roles";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["employer", "candidate"] },
    image: { type: String },
    companyName: { type: String, trim: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof UserSchema> & {
  _id: Schema.Types.ObjectId;
  role?: UserRole;
};

export const User: Model<UserDocument> =
  (models.User as Model<UserDocument> | undefined) ?? model<UserDocument>("User", UserSchema);
