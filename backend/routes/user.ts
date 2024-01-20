import express, { Request, Response } from "express";
import ServiceModel from "./../models/services";
const router = express.Router();
import path from "path";

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
    const services= await ServiceModel.find()
    res.status(200).json(services);
  } catch (error:any) {
    res.status(401).send(error.message).end();
  }
});

export default router;
