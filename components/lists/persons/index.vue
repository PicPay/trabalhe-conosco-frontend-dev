<template>
  <ul class="list-persons">
    <li v-for="item in list" :key="item.id">
      <div class="img">
        <img :src="item.img" />
      </div>
      <div class="data">
        <span class="title">{{ item.name }}</span>
        <span class="subtitle"
          >id: {{ item.id }} <span class="nick">{{ item.username }}</span></span
        >
      </div>
      <div class="actions">
        <img class="pagar" src="/images/pagar.png" @click="pagar(item)" />
        <img class="next" src="/images/down.png" @click="pagar(item)" />
      </div>
    </li>
  </ul>
</template>

<script>
import userService from '~/services/users'

export default {
  data: () => {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const response = await userService.list({})

      if (response.status === 200) {
        this.list = response.data
      }
    },
    async pagar(person) {
      await this.$store.commit('addPerson', person)
      this.$router.push({ name: 'pagar-id', params: { id: person.id } })
    }
  }
}
</script>
