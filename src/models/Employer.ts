import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const EmployerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    billingInfo: {
      country: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

export type EmployerDocument = InferSchemaType<typeof EmployerSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Employer: Model<EmployerDocument> =
  (models.Employer as Model<EmployerDocument> | undefined) ??
  model<EmployerDocument>("Employer", EmployerSchema);
