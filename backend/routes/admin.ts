import * as fs from "fs";
import express, { Request, Response } from "express";
import ServiceModel from "./../models/services";
const router = express.Router();
import multer from "multer";
import ProductModel from "../models/product";
import OrderModel from "../models/order";
const passport = require("passport");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    cb(null, "./files/images");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    const name = file.fieldname + "-" + uniqueSuffix + ext;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addService",
  passport.authenticate("adminJwt", { session: false }),
  upload.single("img"),
  async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const service = new ServiceModel({
        img: req.file?.filename,
        name,
        description,
      });

      await service.save();

      res.status(201).json({ message: "Added successfully" });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  }
);
router.post(
  "/addProduct",
  passport.authenticate("adminJwt", { session: false }),
  upload.single("img"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { name, description, id, price } = req.body;
      const product = new ProductModel({
        img: req.file?.filename,
        name,
        description,
        price: parseInt(price),
      });

      await product.save();
      const productId = product._id.toString();
      await ServiceModel.findByIdAndUpdate(
        id,
        { $push: { products: productId } },
        { new: true }
      );

      res.status(201).json({ message: "Added successfully" });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    try {
      const token = jwt.sign(
        { username: process.env.ADMIN_USERNAME },
        process.env.JWT_ADMIN_SECRET,
        {
          expiresIn: "10h",
        }
      );
      res.send({ adminToken: token }).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  }
);
router.delete(
  "/deleteService/:id",
  passport.authenticate("adminJwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const productIds = await ServiceModel.findById(id).select("products img");
      fs.unlink(
        "./files/images/" + productIds!.img,
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        }
      );
      await ServiceModel.findByIdAndDelete(id);
      productIds?.products.forEach((items) => {
        const img = ProductModel.findById(items).select(" img");
        fs.unlink(
          "./files/images/" + img,
          (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          }
        );
        ProductModel.findByIdAndDelete(items);
      });
      res.status(200).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  }
);
router.delete(
  "/deleteProduct/",
  passport.authenticate("adminJwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const sid = req.query.sid;
      const pid = req.query.pid;
      const pImg = await ProductModel.findById(pid).select("img");
      fs.unlink(
        "./files/images/" + pImg!.img,
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        }
      );
      await ProductModel.findByIdAndDelete(pid);
      const pIds = await ServiceModel.findById(sid);
      if (pIds) {
        const updatedProducts = pIds.products.filter((item) => item != pid);
        pIds.products = updatedProducts;
        await pIds.save();
      }
      res.status(200).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  }
);
router.get(
  "/dashboard",
  passport.authenticate("adminJwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const orders = await OrderModel.find();
      orders.forEach((order) => {
        order._id = order._id.toString();
      });
      res.send(orders).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  }
);
router.get(
  "/completeOrder/:id",
  passport.authenticate("adminJwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        id,
        { pending: false },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).send("Order not found").end();
      }
      res.status(200).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  }
);
export default router;
