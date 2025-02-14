<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  useCart,
  useRuntimeConfig,
  watch,
} from "#imports";
import { useEasyCreditComponents } from "../composables/useEasyCreditComponents";

const { checkPaymentStatus, buildUrl, handleSubmit } =
  useEasyCreditComponents();
const { totalPrice, refreshCart } = useCart();

const component = ref<HTMLElement | null>(null);
const config = useRuntimeConfig().public.easyCredit;
const paymentPlan = ref<string>(null);

async function updatePaymentStatus() {
  try {
    paymentPlan.value = await checkPaymentStatus();
    await refreshCart();
  } catch (error) {
    console.error("Failed to update payment status:", error);
  }
}

// Watch for totalPrice changes to update payment status
watch(totalPrice, updatePaymentStatus);

onMounted(async () => {
  if (component.value) {
    await updatePaymentStatus();
    component.value.addEventListener("submit", handleSubmit as EventListener);
  }
});

onUnmounted(() => {
  if (component.value) {
    component.value.removeEventListener(
      "submit",
      handleSubmit as EventListener,
    );
  }
});

onUpdated(() => {
  if (component.value) {
    component.value.removeEventListener(
      "submit",
      handleSubmit as EventListener,
    );
    component.value.addEventListener("submit", handleSubmit as EventListener);
  }
});
</script>

<template>
  <easycredit-checkout
    ref="component"
    :key="totalPrice"
    :webshop-id="config.apiKey"
    :amount="totalPrice"
    :payment-plan="paymentPlan"
    payment-type="INSTALLMENT"
  />
</template>