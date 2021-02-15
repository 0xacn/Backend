import { object, string, number } from 'joi';

export default object({
    id: string()
        .required(),

    newuid: number()
        .required(),
}).options({ abortEarly: false });
