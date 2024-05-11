import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PLAYER_ID } from 'src/constants/cookies.constants';

export const PlayerId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies?.[PLAYER_ID];
  },
);
