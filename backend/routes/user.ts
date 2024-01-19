import express, { Request, Response } from "express";
import FoodPostModel from "./../models/foodPost";
const router = express.Router();
import multer from "multer";
import path from "path";

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
  "/addFoodPost",
  upload.single("img"),
  async (req: Request, res: Response) => {
    try {
      const { name, cooked, location, user } = req.body;
      const expiredIn= parseInt(req.body.expiredIn as string)
      const newFoodPost = new FoodPostModel({
        img: req.file?.filename,
        date:new Date().toLocaleString(),
        name,
        cooked,
        location,
        expiredIn,
        user,
      });

      await newFoodPost.save();

      res
        .status(201)
        .json({ message: "Food post added successfully", newFoodPost });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Failed to add food post", error: err.message });
    }
  },
);

router.get("/image/:url", async (req: Request, res: Response) => {
  try {
    const fileUrl = req.params.url;
    const filePath = path.join(__dirname, "../files/image/", fileUrl);
    res.sendFile(filePath);
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

router.get("/getFoodPost", async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) - 1 || 0;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const sort: number = parseInt(req.query.sort as string) || -1;
    const search: string = (req.query.search as string) || "";
    const cookedStr: string = (req.query.cooked as string) || "true";
    let cooked:boolean=true
    cookedStr==="false"?cooked=false:cooked=true

    let pageno: number[] = [1];
    const posts = await FoodPostModel.find({
      location: { $regex: search, $options: "i" },
      cooked: cooked ,
    })
      .lean()
      .sort({ date: sort === 1 ? "asc" : "desc" })
      .skip(page * limit)
      .limit(limit).exec();

    const total = await FoodPostModel.countDocuments({
      cooked: { $in: cooked },
      location: { $regex: search, $options: "i" },
    });

    let totalpage: number = Math.ceil(total / limit);

    if (totalpage > 1) {
      for (let i = 1; i < totalpage; i++) {
        pageno.push(i + 1);
      }
    }

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      posts,
      pageno,
    };

    res.status(200).json(response);
  } catch (error:any) {
    res.status(401).send(error.message).end();
  }
});

export default router;
