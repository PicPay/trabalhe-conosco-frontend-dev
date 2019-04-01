<template>
  <div>
    <voltar />
    <cardHeader :person="person" />
    <inputPagar v-model="valor" />
    <actionPagar :valor="valor" />
  </div>
</template>

<script>
import voltar from '~/components/base/voltar'
import cardHeader from '~/components/person/cardHeader'
import inputPagar from '~/components/pagar/inputPagar'
import actionPagar from '~/components/pagar/actionPagar'

export default {
  components: {
    voltar,
    cardHeader,
    inputPagar,
    actionPagar
  },
  data() {
    return {
      valor: '',
      person: {
        img: '',
        name: '',
        id: 0,
        username: ''
      }
    }
  },
  mounted() {
    this.getPerson(this.$route.params.id)
  },
  methods: {
    getPerson(id) {
      this.person = this.$store.state.persons[id]
    }
  }
}
</script>
