<template>
  <div class="person-card-header">
    <div class="img">
      <img :src="person.img" />
    </div>
    <div class="data">
      <span class="title">{{ person.name }}</span>
      <span class="subtitle"
        >id: {{ person.id }}
        <span class="nick">{{ person.username }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  }
}
</script>
