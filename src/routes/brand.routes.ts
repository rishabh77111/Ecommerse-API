import express from 'express';

const router=express.Router();

router.post("/",create);
router.get("/",getAll);
router.get("/:id",getBrandById);
router.get("/:id",update);
router.get("/:id",deleteBrand);