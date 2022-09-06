import type { PageContext } from '@/types/renderer/page';

export default (pageContext: PageContext) => {
  const fragments = pageContext.urlPathname.split('/');
  const alias = fragments[1];
  const amount = fragments[2];
  return {
    routeParams: {
      alias,
      ...(amount && { amount }),
    },
  };
};
