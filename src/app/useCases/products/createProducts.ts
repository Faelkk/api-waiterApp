import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProducts(req: Request, res: Response) {
  const imagePath = req.file?.filename;
  const { name, description, price, category, ingredients } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath: imagePath,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Product creation failed" });
  }
}
