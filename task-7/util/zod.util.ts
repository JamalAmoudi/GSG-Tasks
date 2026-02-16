import { ZodError, ZodType } from 'zod';
import { ModuleNameType } from './constant';
import { CustomError } from './exciptions';
import { HttpErrorStatus } from './util.types';

export const zodValidation = <T>(schema: ZodType<T>, payload: T, moduleName: ModuleNameType) => {
    try {
        const safeData = schema.parse(payload);
        return safeData;
    } catch (error) {

        if (error instanceof ZodError) {
            const formattedErrors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            throw new CustomError(
                "Validation failed",
                moduleName,
                HttpErrorStatus.BadRequest,
                formattedErrors
            );
        }

        throw error;
    }
}