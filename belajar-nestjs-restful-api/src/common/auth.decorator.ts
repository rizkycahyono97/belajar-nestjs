import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

// mengambil context middleware authorization
export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ user?: unknown }>();
    const user = request.user;
    if (user) {
      return user;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  },
);
