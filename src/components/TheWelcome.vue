<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePeer } from '@/hooks/usePeer';

const connectionStatus = reactive([
  '连接中...', '连接123成功！', '连接失败！'
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
let connect:any = null
const start = async () => {
  console.log('启动')
  status.value = 0
  const conn = await usePeer({
    onReceive,
    onOpen
  })
  connect = conn
}
const sendMessage = () => {
  console.log('发送消息')
  console.log(message.value)
  if (!message.value) return
  connect.send(message.value)
}
</script>
<template>
  <div>

    <h3>
      {{ connectionStatus[status] }}
    </h3>
    <button @click="start">启动</button>
    <input v-model="message">
    <button @click="sendMessage">发送</button>
  </div>
</template>
