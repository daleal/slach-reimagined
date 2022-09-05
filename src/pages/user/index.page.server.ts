import * as api from '@/api';

import type { PageContext } from '@/types/renderer/page';
import { makePageProps, redirectTo } from '@/utils/server';

export const onBeforeRender = async (pageContext: PageContext) => {
  const { alias } = pageContext.routeParams;
  try {
    const user = await api.users.get(alias);
    return makePageProps({ user });
  } catch {
    return redirectTo('/');
  }
};
