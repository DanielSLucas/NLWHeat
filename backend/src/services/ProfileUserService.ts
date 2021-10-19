import { User } from '.prisma/client';
import prismaClient from '../prisma';

class ProfileUserService {
  async execute(user_id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}
export { ProfileUserService };
