import mongoose, { Document, Schema } from 'mongoose';

interface FoodPost extends Document {
    img: string;
    date: string;
    name: string;
    cooked: boolean;
    location: string;
    expiredIn: number;
    user: string;
}

const foodPostSchema = new Schema<FoodPost>({
    img: { type: String, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    cooked: { type: Boolean, required: true },
    location: { type: String, required: true },
    expiredIn: { type: Number, required: true },
    user: { type: String, required: true },
});

const FoodPostModel = mongoose.model<FoodPost>('FoodPost', foodPostSchema);

export default FoodPostModel;

