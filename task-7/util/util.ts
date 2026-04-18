import { MyEnvs } from "./declartion-merging.types";


export const getEnvOrThrow = <K extends keyof MyEnvs>(envName: K): MyEnvs[K] => {
    const envValue = process.env[envName];

    if (!envValue) throw new Error('env is missing ' + envName);

    return envValue;
}