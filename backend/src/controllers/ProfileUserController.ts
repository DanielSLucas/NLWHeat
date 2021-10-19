import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileUserService = new ProfileUserService();

    const user = await profileUserService.execute(request.user_id);

    return response.json(user);
  }
}

export { ProfileUserController };
