import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Response } from 'express';
import { AuthorizationService } from './authorization.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('authorization')
export class AuthorizationController {
	private readonly cookieName: string;

	constructor(private readonly authorizationService: AuthorizationService) {
		this.cookieName = "refreshToken";
	}

	@Post("/sign-up")
	create(@Body() signUpDto: SignUpDto) {
		return this.authorizationService.signUp(signUpDto);
	}

	@Post("/sign-in")
	findAll(@Body() signInDto: SignInDto) {
		return this.authorizationService.signIn(signInDto);
	}

	@Post('/refresh')
	findOne(@Param('id') id: string) {
		return this.authorizationService.findOne(+id);
	}

	@Post('/logout')
	remove(@Param('id') id: string) {
		return this.authorizationService.remove(+id);
	}

	private setRefreshCookie(token: string, res: Response) {
        console.log('attack refresh token: ', token);
        return res.cookie(this.cookieName, token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // for next 5 days
        });
    }
}
