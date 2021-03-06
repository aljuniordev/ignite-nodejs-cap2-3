import { inject, injectable } from "tsyringe";
import { deleteFile } from "@utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { };

    async execute({ userId, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        //exclui o antigo se tiver
        if (!user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        //cria o novo avatar
        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }