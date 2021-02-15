import {object, number} from 'joi';

export default object({
    amount: number()
        .required(),
}).options({ abortEarly: false });
