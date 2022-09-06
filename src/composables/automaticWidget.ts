import { ref } from 'vue';

const initiatePayment = ref(false);

export const useAutomaticWidget = () => ({
  initiatePayment,
});
