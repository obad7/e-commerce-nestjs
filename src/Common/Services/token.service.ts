import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';


@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) { }
    
    generateToken(payload, options?: JwtSignOptions): string { 
        return this.jwtService.sign(payload, options);
    }

    verifyToken(token: string, options?: JwtSignOptions) { 
        return this.jwtService.verify(token, options);
    }
}
