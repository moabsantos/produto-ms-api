import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info: Error, context: ExecutionContext) {

        return null; //{token: "123456789"};
      }

}