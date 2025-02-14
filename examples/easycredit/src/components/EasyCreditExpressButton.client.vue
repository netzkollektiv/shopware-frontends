<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  useRuntimeConfig,
} from "#imports";
import { useEasyCreditComponents } from "../composables/useEasyCreditComponents";

const props = defineProps<{
  price: number;
}>();

const { handleSubmit } = useEasyCreditComponents();
const component = ref<HTMLElement | null>(null);
const config = useRuntimeConfig().public.easyCredit;

onMounted(async () => {
  if (component.value) {
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
  <easycredit-express-button
    ref="component"
    :webshop-id="config.apiKey"
    :amount="props.price"
    payment-types="INSTALLMENT,BILL"
    :full-width="false"
  />
</template>
