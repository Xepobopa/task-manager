import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException, Req } from '@nestjs/common';
import { Response, Request } from 'express';
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
	async create(@Body() signUpDto: SignUpDto) {
		return this.authorizationService.signUp(signUpDto);
	}

	@Post("/sign-in")
	async findAll(@Res() res: Response, @Body() signInDto: SignInDto) {
		const result = await this.authorizationService.signIn(signInDto);
		
		this.setRefreshCookie(result.tokens.refreshToken, res)
		  .status(HttpStatus.OK)
          .send({
            user: result.user,
            accessToken: result.tokens.accessToken,
          });
	}

	@Post('/refresh')
	async refreshToken(@Req() req: Request, @Res() res: Response) {
		const token = this.getRefreshToken(req);

		const result = await this.authorizationService.refreshToken(token);
		console.log(result);

		this.setRefreshCookie(result.tokens.refreshToken, res)
		  .status(HttpStatus.OK)
		  .send({
		  	user: result.user,
			accessToken: result.tokens.accessToken,
		  });
	}

	// to logout client must delete 'refreshToken' cookie and accessToken locally
	// @Post('/logout')
	// async logout() {
	// }

	private setRefreshCookie(token: string, res: Response) {
        return res.cookie(this.cookieName, token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // for next 3 days
        });
    }

	private getRefreshToken(req: Request) {
        const token = req.cookies[this.cookieName];
        console.log('Token: ', token);

        if (!token || token === '' || token === null) {
            throw new UnauthorizedException(
                'Refresh token not found. Please, relogin!'
            );
        }

        return token;
    }
}
