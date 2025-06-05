<script setup lang="ts">
import { inject, ref } from 'vue'
const peerOptions = inject('peerOptions')
const test = () => {
    console.log(peerOptions)
}

</script>

<template>
  <main @click="test">
 111
  </main>
</template>
