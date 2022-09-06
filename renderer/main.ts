import { createSSRApp, defineComponent, h } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBolt, faClipboardCheck, faCopy, faHandHoldingDollar, faStore, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { setPageContext } from '../src/composables/pageContext';

import type { PageContext } from '../src/types/renderer/page';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../src/assets/styles/main.css';

export const createApp = (pageContext: PageContext) => {
  const { Page, pageProps } = pageContext;

  library.add(faBolt, faClipboardCheck, faCopy, faHandHoldingDollar, faStore, faTwitter, faUser);

  const ApplicationComponent = defineComponent({
    render() {
      return h(Page, pageProps || {});
    },
  });

  const application = createSSRApp(ApplicationComponent);

  setPageContext(application, pageContext);

  return application;
};
