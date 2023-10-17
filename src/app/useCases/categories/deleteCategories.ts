import { Request, Response } from "express";

import { Category } from "../../models/Category";

export async function deleteCategories(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);
    await Category.findByIdAndDelete(categoryId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
