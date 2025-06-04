<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePeer } from '@/hooks/usePeer';
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route)

const connectionStatus = reactive([
  '连接中...', '连接成功！', '连接失败！'
])
const status = ref(0)

const message = ref('')


const onReceive = (data: unknown) => {
  console.log('接收到消息')
  console.log(data)
}

const onOpen = (id: string) => {
  console.log('连接成功' + id)
  status.value = 1
}
const targetPeerId = route.params.id as string
let connect


const start = () => {
  status.value = 0
  const {conn} = usePeer({
  targetPeerId,
  onReceive,
  onOpen
})
connect = conn
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
