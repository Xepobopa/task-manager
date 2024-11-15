import { IsMongoId, IsString } from "class-validator";

export abstract class AbstarctDto {
    @IsString()
    @IsMongoId()
    _id: string;
}