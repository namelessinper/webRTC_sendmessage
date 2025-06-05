<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePeer } from '@/hooks/usePeer';
import { useRoute } from 'vue-router';

const route = useRoute()


const message = ref('')


const targetPeerId = route.params.id as string
let connect: any = null


const start = async () => {
 
}

const sendMessage = () => {
  connect.send(message.value)
}
</script>
<template>
  <div>

    <h3>
      about
    </h3>
    <button @click="start">链接</button>


    <input v-model="message">
    <button @click="sendMessage">发送</button>
  </div>
</template>
