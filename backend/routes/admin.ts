import * as fs from "fs";
import express, { Request, Response } from "express";
import ServiceModel from "./../models/services";
const router = express.Router();
import multer from "multer";
import ProductModel from "../models/product";
const passport = require("passport");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function,
  ) {
    cb(null, "./files/images");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length,
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

      res.status(201).json({ message: "Added successfully"});
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  },
);
router.post(
  "/addProduct",
  passport.authenticate("adminJwt", { session: false }),
  upload.single("img"),
  async (req: Request, res: Response) => {
    try {
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
        { new: true },
      );

      res.status(201).json({ message: "Added successfully" });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  },
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
        },
      );
      res.send({ adminToken: token }).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  },
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
        },
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
          },
        );
        ProductModel.findByIdAndDelete(items);
      });
      res.status(200).end();
    } catch (error) {
      res.status(401).send(error).end();
    }
  },
);
export default router;
