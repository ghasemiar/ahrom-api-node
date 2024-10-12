import { Request, Response } from 'express';
import { postService } from './post.service';
import { AuthRequest } from '../../middleware/authentication.middleware';

export const createPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await postService.createPost(
      req.body,
      req.user,
      req.file?.filename ? req.file.filename : null
    );
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await postService.updatePost(
      parseInt(req.params.id),
      req.body,
      req.user,
      req.file?.filename ? req.file?.filename : null
    );
    res.status(code).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await postService.getAllPost();
    res.status(code).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code } = await postService.getPost(parseInt(req.params.id));
    res.status(code).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getPostBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await postService.getPostBySlug(req.params.slug);
    res.status(code).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { msg, code } = await postService.deletePost(Number(id));
    res.status(code).json(msg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
