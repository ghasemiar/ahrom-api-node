import { myDataSource } from '../../database/typeorm.connection';
import StatusCodes from '../../types/statusCodes';
import { Tag } from './entities/tag.entity';
import { TagCreateDTO, TagUpdateDTO } from './dtos/tag.import.dto';

class TagService {
  private tagRepository = myDataSource.getRepository(Tag);
  async createTag(data: TagCreateDTO): Promise<{ data: any; code: number }> {
    const userTag = new Tag();
    userTag.name = data.name;
    const results = await this.tagRepository.save(userTag);
    return { data: results, code: 201 };
  }
  async getAllTag(): Promise<{
    data: any;
    code: number;
  }> {
    const result = await this.tagRepository.find();
    return { data: result, code: 200 };
  }
  async getTag(id: number): Promise<{ data: any; code: number }> {
    const results = await this.tagRepository.findOneBy({
      id: id,
    });
    if (!results) {
      return { data: 'not found', code: 404 };
    }
    return { data: results, code: 200 };
  }
  async updateTag(
    id: number,
    data: TagUpdateDTO
  ): Promise<{ data: any; code: number }> {
    const cat = await this.tagRepository.findOneBy({
      id: id,
    });
    if (!cat) {
      return { data: 'not found', code: 404 };
    }
    cat.name = data.name;
    const results = await this.tagRepository.save(cat);
    return { data: results, code: 200 };
  }
  async deleteTag(id: number): Promise<{ msg: string; code: number }> {
    try {
      const results = await this.tagRepository.delete(id);
      if (results.affected == 0) {
        return { msg: 'not found', code: 404 };
      }
      return { msg: 'delete successfully', code: 200 };
    } catch (err) {
      return { msg: 'cant delete', code: StatusCodes.INTERNAL_SERVER_ERROR };
    }
  }
  async deleteMultipleTag(
    ids: number[]
  ): Promise<{ msg: string; code: number }> {
    try {
      const multipleDelete = await this.tagRepository
        .createQueryBuilder()
        .delete()
        .from(Tag)
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
export const tagService = new TagService();
