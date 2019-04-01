<template>
  <div>
    <voltar />
    <form class="cartao-novo">
      <div class="group">
        <input v-model="form.name" class="inputMaterial" type="text" required />
        <span class="bar"></span>
        <label>Nome escrito no cartão</label>
      </div>
      <div class="group">
        <input
          v-model="form.card_number"
          v-mask="'#### #### #### ####'"
          class="inputMaterial"
          type="text"
          required
        />
        <span class="bar"></span>
        <label>Número do cartão</label>
      </div>
      <div class="group">
        <input
          v-model="form.expiry_date"
          v-mask="'##/##'"
          class="inputMaterial"
          type="text"
          required
        />
        <span class="bar"></span>
        <label>Validade (mm/aa)</label>
      </div>
      <div class="group">
        <input
          v-model="form.cvv"
          v-mask="'######'"
          class="inputMaterial"
          type="text"
          required
        />
        <span class="bar"></span>
        <label>Código de segurança</label>
      </div>
      <div class="group">
        <input
          v-model="form.cep"
          v-mask="'#####-###'"
          class="inputMaterial"
          type="text"
          required
        />
        <span class="bar"></span>
        <label>CEP do endereço da fatura</label>
      </div>
    </form>
    <div class="botton">
      <button type="button" class="btn" @click="save">CADASTRAR</button>
    </div>
  </div>
</template>

<script>
import voltar from '~/components/base/voltar'

export default {
  components: {
    voltar
  },
  data() {
    return {
      form: {
        name: '',
        card_number: '',
        cvv: '',
        expiry_date: '',
        cep: ''
      }
    }
  },
  methods: {
    save() {
      if (this.$route.params.id === undefined) {
        this.newCard(this.form)
      } else {
        this.updateCard({
          index: this.$route.params.id,
          card: this.form
        })
      }
    },
    async newCard(card) {
      await this.$store.commit('addCard', card)
      this.$router.back()
    },
    async updateCard(obj) {
      await this.$store.commit('updateCard', obj)
      this.$router.back()
    }
  }
}
</script>
