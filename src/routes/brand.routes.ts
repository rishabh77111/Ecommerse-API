import express from 'express';
import { create, deleteBrand, getAll, getBrandById, update } from '../controllers/brand.controller';

const router=express.Router();

router.post("/",create);
router.get("/",getAll);
router.get("/:id",getBrandById);
router.put("/:id",update);
router.delete("/:id",deleteBrand);

export default router;