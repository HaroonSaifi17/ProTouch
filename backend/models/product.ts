import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
  name: string;
  description: string;
  price:number;
  img:string;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
