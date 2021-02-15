import { object, string, number } from 'joi';

export default object({
    id: string()
        .required(),

    amount: number()
        .required(),
}).options({ abortEarly: false });
