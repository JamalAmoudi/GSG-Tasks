import z, { ZodType } from 'zod';
import { User } from '../user.entity';
import { ROLES_NAMES, RolesNamesType } from '../../../util/constant';


export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Object.values(ROLES_NAMES)).default('STUDENT'),
    createdAt: z.date(),
    updatedAt: z.date(),
    password: z.string().min(8)
}) satisfies ZodType<User>