import { myDataSource } from '../../database/typeorm.connection';
import { Post } from './entities/post.entity';
import { PostImportDto, transformPost } from './dtos/post.import.dto';
import { Category } from '../category/entities/category.entity';
import { Tag } from '../tag/entities/tag.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import StatusCodes from '../../types/statusCodes';
import { User } from '../user/entities/user.entity';

class PostService {
  private postRepository = myDataSource.getRepository(Post);
  private categoryRepository = myDataSource.getRepository(Category);
  private tagRepository = myDataSource.getRepository(Tag);
  //curd service
  async createPost(
    data: PostImportDto,
    author: User,
    image: string | null
  ): Promise<{ data?: any; code: number; msg: string }> {
    try {
      const transformedData = transformPost(data);
      const postData = plainToInstance(Post, { ...transformedData });
      if (data.categories) {
        for (const category of data.categories) {
          const cat = await this.categoryRepository.findOneBy({ id: category });
          if (!cat) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          postData.categories.push(cat);
        }
      }
      if (transformedData.tags) {
        for (const tag of data.tags) {
          const findTag = await this.tagRepository.findOneBy({ id: tag });
          if (!findTag) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          postData.tags.push(findTag);
        }
      }
      if (transformedData.related_post) {
        for (const post of data.related_post) {
          const relatedPost = await this.postRepository.findOneBy({ id: post });
          if (!relatedPost) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          postData.related_post.push(relatedPost);
        }
      }
      if (image != null) {
        postData.image = `images/${image}`;
      }
      if (transformedData.isPublish) {
        postData.published_at = new Date();
      }
      postData.author = author;
      const savePost = await this.postRepository.save(postData);
      return {
        msg: 'post created successfully',
        data: savePost,
        code: StatusCodes.CREATED,
      };
    } catch (err) {
      return {
        msg: 'there is a problem to create post',
        data: err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async updatePost(
    id: number,
    data: PostImportDto,
    author: User,
    image: string | null
  ): Promise<{ data?: any; code: number; msg: string }> {
    try {
      const findPost = await this.postRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          tags: true,
          categories: true,
        },
      });
      const updatePost = {
        ...findPost,
        ...plainToInstance(Post, transformPost(data)),
      };
      if (data.categories) {
        updatePost.categories = [];
        for (const category of data.categories) {
          const cat = await this.categoryRepository.findOneBy({ id: category });
          if (!cat) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          updatePost.categories.push(cat);
        }
      }
      if (data.tags) {
        updatePost.tags = [];
        for (const tag of data.tags) {
          const findTag = await this.tagRepository.findOneBy({ id: tag });
          if (!findTag) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          updatePost.tags.push(findTag);
        }
      }
      if (data.related_post) {
        updatePost.related_post = [];
        for (const post of data.related_post) {
          const relatedPost = await this.postRepository.findOneBy({ id: post });
          if (!relatedPost) {
            return { code: StatusCodes.NOT_FOUND, msg: 'category not exists' };
          }
          updatePost.related_post.push(relatedPost);
        }
      }
      if (!!image) {
        updatePost.image = `images/${image}`;
      }
      if (data.isPublish) {
        updatePost.published_at = new Date();
      }
      updatePost.author = author;

      const savePost = await this.postRepository.save(updatePost);
      return {
        msg: 'post created successfully',
        data: savePost,
        code: StatusCodes.CREATED,
      };
    } catch (err) {
      return {
        msg: 'there is a problem to create post',
        data: err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async getAllPost(): Promise<{ data: any; msg: string; code: number }> {
    try {
      const result = await this.postRepository.find({
        relations: {
          tags: true,
          categories: true,
          related_post: true,
        },
      });
      return {
        data: result,
        msg: 'data get successfully',
        code: StatusCodes.OK,
      };
    } catch (err) {
      return {
        msg: 'there is a problem to get all post',
        data: err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getPost(id: number): Promise<{ data: any; msg: string; code: number }> {
    try {
      const result = await this.postRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          tags: true,
          categories: true,
          related_post: true,
        },
      });
      return {
        data: result,
        msg: 'data get successfully',
        code: StatusCodes.OK,
      };
    } catch (err) {
      return {
        msg: 'there is a problem to get all post',
        data: err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getPostBySlug(
    slug: string
  ): Promise<{ data: any; msg: string; code: number }> {
    try {
      const result = await this.postRepository.findOne({
        where: {
          slug: slug,
        },
        select: {
          slug: true,
          categories: true,
          author: {
            username: true,
          },
          image: true,
          id: true,
          content: true,
          related_post: true,
          tags: true,
          excerpt: true,
          isPublish: true,
          published_at: true,
          keywords: true,
          title: true,
          description: true,
        },
        relations: {
          tags: true,
          author: true,
          categories: true,
          related_post: true,
        },
      });
      return {
        data: result,
        msg: 'data get successfully',
        code: StatusCodes.OK,
      };
    } catch (err) {
      return {
        msg: 'there is a problem to get all post',
        data: err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async deletePost(
    id: number
  ): Promise<{ msg: string; code: number; err?: any }> {
    try {
      const result = await this.postRepository.delete(id);
      if (result.affected == 0) {
        return { msg: 'no post deleted', code: StatusCodes.NOT_FOUND };
      }
    } catch (err) {
      return {
        msg: 'can not delete post',
        err,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
export const postService = new PostService();
