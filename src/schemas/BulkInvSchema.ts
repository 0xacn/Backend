import { object, string, number} from 'joi';

export default object({
    executerId: string()
    .required(),
  count: number()
    .required()
}).options({ abortEarly: false });
