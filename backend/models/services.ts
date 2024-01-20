import mongoose, { Document, Schema } from "mongoose";

interface Service extends Document {
  img: string;
  name: string;
  description: string;
}

const serviceSchema = new Schema<Service>({
  img: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ServiceModel = mongoose.model<Service>("Service", serviceSchema);

export default ServiceModel;
