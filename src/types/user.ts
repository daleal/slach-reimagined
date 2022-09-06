import { accountTypes } from '@/utils/accountTypes';
import { banks } from '@/utils/banks';

export interface User {
  email: string,
  name: string,
  rut: string,
  bank: typeof banks[number]['id'],
  accountNumber: number,
  accountType: typeof accountTypes[number]['id'],
  confirmed: boolean,
}
