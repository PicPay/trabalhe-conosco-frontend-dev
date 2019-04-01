<template>
  <div class="action-pagar">
    <div class="container">
      <div v-if="!cards" class="alert-pagar">
        <div class="img">
          <img src="/images/alert.png" />
        </div>
        <div v-if="!cards" class="data">
          <span>Nenhum cartão de crédito cadastrado.</span>
          <nuxt-link :to="{ name: 'cartao-form-id' }"
            >Cadastrar agora.</nuxt-link
          >
        </div>
      </div>
      <div v-else class="card-check">
        <div class="img">
          <img src="/images/green.png" />
        </div>
        <div class="data">
          <span>Forma de pagamento:</span>
          <span class="bold">Cartão de crédido com final: {{ cardHelp }}</span>
        </div>
      </div>
      <button :disabled="!cards" type="button" @click="pagar">PAGAR</button>
    </div>
  </div>
</template>

<script>
import transaction from '~/services/transaction'

export default {
  props: {
    valor: {
      type: String,
      required: true
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards.length
    },
    cardHelp() {
      return this.$store.getters.cardHelp
    }
  },
  methods: {
    async pagar() {
      const numberCard = this.$store.getters.cardActive.card_number
        .split(' ')
        .join('')

      const response = await transaction.create({
        card_number: parseInt(numberCard),
        cvv: this.$store.getters.cardActive.cvv,
        value: this.moneyToFloat(this.valor),
        expiry_date: this.$store.getters.cardActive.expiry_date,
        destination_user_id: parseInt(this.$route.params.id)
      })

      if (response.status === 200) {
        const t = response.data.transaction
        t.card_help = this.cardHelp

        await this.$store.commit('addTransaction', t)
        this.$router.push({ name: 'transaction-id', params: { id: t.id } })
      }
    },
    moneyToFloat(currency) {
      currency = currency.replace('R$ ', '')
      currency = currency.replace('.', '')
      currency = currency.replace(',', '.')
      currency = parseFloat(currency)
      currency = (currency * 10).toFixed(2)
      return currency
    }
  }
}
</script>
