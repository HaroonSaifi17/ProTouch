import express, { Request, Response } from "express";
import ServiceModel from "./../models/services";
const router = express.Router();
import multer from "multer";

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
  upload.single("img"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.file)
      const { name, description } = req.body;
      const service = new ServiceModel({
        img: req.file?.filename,
        name,
        description,
      });

      await service.save();

      res.status(201).json({ message: "Added successfully", service });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add", error: err.message });
    }
  },
);

export default router;
