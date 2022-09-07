import axios from 'axios';
import { rutClean } from 'rut-helpers';
import { ORACLE_HOST } from '@/constants';

import type { OracleEntity } from '@/types/oracle';

export const queryByRut = async (dirtyRut: string) => {
  const response = await axios.get<{ entity: OracleEntity }>(
    `${ORACLE_HOST}/api/v1/get_entity_by_rut`,
    { params: { rut: rutClean(dirtyRut) } },
  );
  return response.data.entity;
};
