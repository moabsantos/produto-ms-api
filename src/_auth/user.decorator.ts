import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    if (token)
      token = token.replace(/^Bearer\s+/, "");
    else
      token = ''
    
    return {token: token}
  },
);