import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.services';
import bcrypt from 'bcrypt-nodejs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne({
            username,
        });
        if (bcrypt.compareSync(password, user.encryptedPassword)) {
            return user;
        } else {
            return null;
        }
    }

    getToken(user: User) {
        if (user) {
            const payload = { username: user.username, sub: user.id };
            return {
                access: this.jwtService.sign(payload),
            };
        } else {
            return null;
        }
    }

    async signIn(data: SignInDto) {
        const userFound =
            (await User.count({
                where: [{ email: data.email }, { username: data.username }],
            })) > 0;
        if (userFound) {
            throw new HttpException(
                { code: 'email_or_username_already_in_use' },
                HttpStatus.BAD_REQUEST,
            );
        }

        const newUser = User.create({
            email: data.email,
            username: data.username,
            encryptedPassword: bcrypt.hashSync(data.password),
        });
        await newUser.save();
        return this.getToken(newUser);
    }

    async login(data: LoginDto) {
        const user = await this.validateUser(data.username, data.password);
        return this.getToken(user);
    }
}
