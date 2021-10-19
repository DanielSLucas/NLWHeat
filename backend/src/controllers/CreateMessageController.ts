import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;

    const createMessageService = new CreateMessageService();

    const message = await createMessageService.execute(text, request.user_id);

    return response.json(message);
  }
}
export { CreateMessageController };
