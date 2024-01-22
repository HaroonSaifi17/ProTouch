import mongoose, { Document, Schema } from "mongoose";

interface Order extends Document {
  name: string;
  number: number;
  totalprice: number;
  pending:boolean;
  items: { name: string; price: string; id: string; pid: string; pname: string }[];
}

const orderSchema = new Schema<Order>({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  pending:{ type: Boolean, required: true },
  items: { 
    type: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        id: { type: String, required: true },
        pid: { type: String, required: true },
        pname: { type: String, required: true },
      }
    ], 
    required: true 
  },
});

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
