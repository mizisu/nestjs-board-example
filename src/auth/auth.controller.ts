import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        operationId: 'Sign in',
    })
    @ApiResponse({
        status: 201,
        description: 'Sign in success',
        type: AccessTokenDto,
    })
    @Post('/sign-in/')
    signIn(@Body() body: SignInDto) {
        this.authService.signIn(body);
    }

    @ApiOperation({
        operationId: 'Login',
    })
    @ApiResponse({
        status: 201,
        description: 'Login success',
        type: AccessTokenDto,
    })
    @Post('/login/')
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }
}
