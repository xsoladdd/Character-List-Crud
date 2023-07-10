import { generateID } from '@/utils/id';
import { object, string, number, date, InferType, boolean, ObjectSchema } from 'yup';


export const characterSchema= object({
  name: string().required(),
  description: string().required(),
  id: string().default(generateID()),
  weapon: string().required(),
  combatStatus:boolean().default(true)
});