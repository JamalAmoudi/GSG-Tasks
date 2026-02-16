import { ZodType } from 'zod';
import { userSchema } from '../../User/util/user.schema';
import { RegisterDTO, LoginDTO, restrictToDTO } from '../Types/auth.dto';

export const registerDTOSchema = userSchema.pick({
    email: true,
    name: true,
    role: true,
    password: true
}) satisfies ZodType<RegisterDTO>;

export const loginDTOSchema = userSchema.pick({
    email: true,
    password: true
}) satisfies ZodType<LoginDTO>;

