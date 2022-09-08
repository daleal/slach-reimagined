import { getFintoc } from '@fintoc/fintoc-js';
import { FINTOC_PUBLIC_KEY } from '@/constants';

const fintocPromise = getFintoc();

export const useFintocWidget = async ({
  product,
  holderType,
  widgetToken = undefined,
  webhookUrl = undefined,
  onSuccess = () => null,
  onExit = () => null,
}: {
  product: 'payments' | 'movements',
  holderType: 'individual' | 'business',
  widgetToken?: string,
  webhookUrl?: string,
  onSuccess?: () => void,
  onExit?: () => void,
}) => {
  const fintoc = await fintocPromise;

  return fintoc?.create({
    publicKey: FINTOC_PUBLIC_KEY,
    holderType,
    widgetToken,
    webhookUrl,
    product,
    onSuccess,
    onExit,
  }) || null;
};
