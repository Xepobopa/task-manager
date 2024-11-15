import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class SignUpDto {
    @IsString()
    @Length(3, 64)
    username: string;

    @IsEmail()    
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 7,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
    })
    password: string;
}