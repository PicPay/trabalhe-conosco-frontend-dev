<template>
  <div class="transaction">
    <h5>Pagamento confirmado!</h5>
    <ul>
      <li>
        <div class="title">Transação</div>
        <div class="value">{{ transacao }}</div>
      </li>
      <li>
        <div class="title">Data</div>
        <div class="value">{{ data }}</div>
      </li>
      <li>
        <div class="title">Cartão</div>
        <div class="value">**** **** **** {{ cartao }}</div>
      </li>
      <li>
        <div class="title">Valor</div>
        <div class="value">{{ valor }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transacao: '',
      data: '',
      cartao: '',
      valor: ''
    }
  },
  mounted() {
    this.getTransacao(this.$route.params.id)
  },
  methods: {
    getTransacao(id) {
      const t = this.$store.state.transactions[id]

      this.transacao = t.id
      this.data = t.timestamp
      this.cartao = t.card_help
      this.valor = t.value
    }
  }
}
</script>
