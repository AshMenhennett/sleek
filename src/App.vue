<template>
  <div id="app">
    <keep-alive>
      <component :is="type" @changeType="changeType"></component>
    </keep-alive>
  </div>
</template>

<script>
import TrueFalse from './components/TrueFalse'
import Landing from './components/Landing'

export default {
  name: 'app',
  components: {
    TrueFalse,
    Landing
  },
  data() {
    return {
      type: 'Landing'
    }
  },
  methods: {
    changeType(type) {
      return this.type = type;
    }
  }
}
</script>
