import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const TokenExtractor = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string | null => {
        const request: Request = ctx.switchToHttp().getRequest();
        const token = request.headers['authorization'];

        return (token ? token.split(' ')[1] : null);    
    },
  );