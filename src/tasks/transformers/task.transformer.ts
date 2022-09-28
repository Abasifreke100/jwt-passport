import { Transformer } from '../../common/transformer/transform';

export class TaskTransformer extends Transformer {
  async transform(task: any): Promise<Record<string, any>> {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
    };
  }
}
