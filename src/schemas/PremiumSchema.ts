import { object, string, number } from 'joi';

export default object({
    id: string()
        .required(),
}).options({ abortEarly: false });
