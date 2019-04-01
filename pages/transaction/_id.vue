<template>
  <div>
    <voltar />
    <cardHeader :person="person" />
    <transaction />
  </div>
</template>

<script>
import voltar from '~/components/base/voltar'
import cardHeader from '~/components/person/cardHeader'
import transaction from '~/components/transaction'

export default {
  components: {
    voltar,
    cardHeader,
    transaction
  },
  data() {
    return {
      person: {
        img: '',
        name: '',
        id: 0,
        username: ''
      }
    }
  },
  mounted() {
    this.getTransaction(this.$route.params.id)
  },
  methods: {
    getTransaction(id) {
      this.person = this.$store.state.transactions[id].destination_user
    }
  }
}
</script>
