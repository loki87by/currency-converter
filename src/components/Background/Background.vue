<template>
  <section class="background">
    <p
        v-for="(item, index) in backgroundArray"
        :key="index"
        :style="item.style"
      >{{ item.content }}</p>
  </section>
</template>

<script>
import { SYMBOLS, ANIMATION_TIMING_FUNCTION_ARRAY, BACKGROUND_ARRAY } from '../../utils/consts'

export default {
  name: 'Background',
  data: function () {
    return {
      backgroundArray: BACKGROUND_ARRAY
    }
  },
  methods: {
    stringStyle: function () {
      return {
        fontSize: Math.ceil(Math.random() * 5) * 2 + 5 + 'vh',
        left: Math.floor(Math.random() * 90) + 'vw',
        top: 0,
        animationName: 'rain',
        animationDuration: Math.ceil(Math.random() * 4) * 2 + 1 + 's',
        animationTimingFunction:
          ANIMATION_TIMING_FUNCTION_ARRAY[Math.floor(Math.random() * ANIMATION_TIMING_FUNCTION_ARRAY.length)],
        animationFillMode: 'forwards'
      }
    },
    timer: function () {
      setInterval(() => {
        const el = {
          style: this.stringStyle(),
          content: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        }
        this.backgroundArray.push(el)
      }, 700)
    }
  },
  mounted () {
    this.timer()
  }
}
</script>

<style scoped>
@import url("../../styles/background.css");
</style>
