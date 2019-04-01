<template>
  <div class="input-pagar">
    <input
      v-money="money"
      type="text"
      placeholder="R$ 0,00"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  }
}
</script>
