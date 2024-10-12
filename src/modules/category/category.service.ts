import { Category } from './entities/category.entity';
import { myDataSource } from '../../database/typeorm.connection';
import {
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from './dtos/category.import.dto';
import StatusCodes from '../../types/statusCodes';

class CategoryService {
  private categoyrRepository = myDataSource.getRepository(Category);
  async createCategroy(
    data: CategoryCreateDTO
  ): Promise<{ data: any; code: number }> {
    const cat = new Category();
    cat.name = data.name;
    const results = await this.categoyrRepository.save(cat);
    return { data: results, code: 201 };
  }
  async getCategories(): Promise<{
    data: any;
    code: number;
  }> {
    const result = await this.categoyrRepository.find();
    return { data: result, code: 200 };
  }
  async getCategory(id: number): Promise<{ data: any; code: number }> {
    const results = await this.categoyrRepository.findOneBy({
      id: id,
    });
    if (!results) {
      return { data: 'not found', code: 404 };
    }
    return { data: results, code: 200 };
  }
  async updateCategory(
    id: number,
    data: CategoryUpdateDTO
  ): Promise<{ data: any; code: number }> {
    const cat = await this.categoyrRepository.findOneBy({
      id: id,
    });
    if (!cat) {
      return { data: 'not found', code: 404 };
    }
    myDataSource.getRepository(Category).merge(cat, data);
    const results = await myDataSource.getRepository(Category).save(cat);
    return { data: results, code: 200 };
  }
  async deleteCategory(id: number): Promise<{ msg: string; code: number }> {
    try {
      const results = await this.categoyrRepository.delete(id);
      if (results.affected == 0) {
        return { msg: 'not found', code: 404 };
      }
      return { msg: 'delete successfully', code: 200 };
    } catch (err) {
      return { msg: 'cant delete', code: StatusCodes.INTERNAL_SERVER_ERROR };
    }
  }
  async deleteMultipleCategory(
    ids: number[]
  ): Promise<{ msg: string; code: number }> {
    try {
      const multipleDelete = await this.categoyrRepository
        .createQueryBuilder()
        .delete()
        .from(Category)
        .whereInIds(ids)
        .execute();
      if (multipleDelete.affected === 0) {
        return { msg: 'theres nothing to delete', code: StatusCodes.NOT_FOUND };
      }
      return { msg: 'delete successfully', code: 200 };
    } catch (err) {
      console.log(err.message);
    }
  }
}
export const categoryService = new CategoryService();
