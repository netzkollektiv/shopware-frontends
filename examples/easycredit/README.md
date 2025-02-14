# easyCredit Payment Integration for Shopware Frontends

This module provides integration with easyCredit payment solution, allowing customers to use easyCredit financing options in your [Shopware Frontends](https://github.com/shopware/frontends) store.

## Features

- 🔌 easycredit-components plugin to add easycredit components to the DOM
- ⚡ EasyCreditExpressButton.client.vue component to implement the express checkout from the product page
- 🛒 EasyCreditCheckout.client.vue component to implement the checkout flow
- 💳 useEasyCreditComponents composable function with utils to start the checkout flow and check the payment status

The integration is using the [easyCredit Web Components](https://netzkollektiv.com/docs/easycredit-components). Check them out for usage and more components.

## Integration Steps

To use this integration the easyCredit plugin (>= 3.1) must be installed in Shopware.

### Configuration

Register the module in your Nuxt 3 project

```js
  // ./demo-store/nuxt.config.ts
  modules: [ 
    ...
    "../examples/easycredit/src/module"
  ]
  // see that "../src/module" points to this dir (from ./playground/nuxt.config.ts file)
````

Add the easyCredit configuration to the project:

```ts
  export default defineNuxtConfig({
    runtimeConfig: {
      public: 
        easyCredit: {
          apiKey: '1.de.1234.1' // your webshop id
        }
      }
    }
  });
```

### Express Button

Add the express button next to the add to cart button in `demo-store/components/SwProductAddToCart.vue`

```vue
<EasyCreditExpressButton :amount="product.calculatedPrice.unitPrice" />
```

### Checkout Integration    

Add the checkout component to the checkout page in `demo-store/pages/checkout/index.vue`

```vue
<br />
<div v-if="singlePaymentMethod.id === selectedPaymentMethod" class="block">
    <EasyCreditCheckout :amount="totalPrice" />
</div>
```