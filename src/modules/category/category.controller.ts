import { Request, Response } from 'express';

import { categoryService } from './category.service';

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await categoryService.createCategroy(req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await categoryService.getCategories();
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await categoryService.getCategory(Number(id));
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await categoryService.updateCategory(
      Number(id),
      req.body
    );
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { msg, code } = await categoryService.deleteCategory(Number(id));
    res.status(code).json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteMultipleCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ids } = req.body;
    const { code, msg } = await categoryService.deleteMultipleCategory(ids);
    res.status(code).json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
