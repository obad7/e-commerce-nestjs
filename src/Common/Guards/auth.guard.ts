import {
    Injectable,
    CanActivate,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException
} from "@nestjs/common";
import { UserRepo } from 'src/DB/Repositories/user.repo';
import { TokenService } from './../Services/token.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly tokenService: TokenService,
        private readonly userRepo: UserRepo,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const { authorization } = request.headers;
            if (!authorization) throw new UnauthorizedException("Authorization header is required");

            const data = this.tokenService.verifyToken(authorization, { secret: process.env.JWT_SECRET });
            
            const user = await this.userRepo.findByEmail(data.email);
            if (!user) throw new NotFoundException("User not found");

            request.authUser = user;
            return true;

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }    

}