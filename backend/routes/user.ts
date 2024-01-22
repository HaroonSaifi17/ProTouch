import express, { Request, Response } from "express";
import ServiceModel from "./../models/services";
const router = express.Router();
import path from "path";
import ProductModel from "../models/product";
import OrderModel from "../models/order";

router.get("/image/:url", async (req: Request, res: Response) => {
  try {
    const fileUrl = req.params.url;
    const filePath = path.join(__dirname, "../files/images/", fileUrl);
    res.sendFile(filePath);
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

router.get("/getService", async (req: Request, res: Response) => {
  try {
    const services = await ServiceModel.find();
    services.forEach((service) => {
      service._id = service._id.toString();
    });
    res.status(200).json(services);
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

router.get("/getProduct/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Missing ID parameter");
    }
    const services = await ServiceModel.findById(id).select("products name");
    let productDetails = await Promise.all(
      services!.products.map(async (productId) => {
        const product = await ProductModel.findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        return product;
      }),
    );
    productDetails.forEach((product) => {
      product._id = product._id.toString();
    });
    res.status(200).json({products:productDetails,name:services?.name});
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

router.post(
  "/book",
  async (req: Request, res: Response) => {
    try {
      const { name, totalprice , number,orders } = req.body;
      const items= JSON.parse(orders) 
      const order=new OrderModel({
        name:name,
        number:number,
        totalprice:totalprice,
        items: items,
        pending:true
      })
      await order.save() 
      res.status(201).json({ id: order._id });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  },
);

export default router;
