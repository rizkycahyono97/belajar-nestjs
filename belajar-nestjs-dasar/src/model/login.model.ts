import z from 'zod';

export class LoginUserRequest {
  username: string | undefined;
  password: string | undefined;
}

export const loginUserRequestValidation = z.object({
  username: z.string().max(100).min(1),
  password: z.string().max(100).min(1),
});
