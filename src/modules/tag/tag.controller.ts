import { Request, Response } from 'express';
import { tagService } from './tag.service';

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await tagService.createTag(req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await tagService.getAllTag();
    res.status(code).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await tagService.getTag(Number(id));
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { data, code } = await tagService.updateTag(Number(id), req.body);
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { msg, code } = await tagService.deleteTag(Number(id));
    res.status(code).json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteMultipleTag = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ids } = req.body;
    const { code, msg } = await tagService.deleteMultipleTag(ids);
    res.status(code).json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
