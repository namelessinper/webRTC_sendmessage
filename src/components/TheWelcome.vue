<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePeer } from '@/hooks/usePeer';

const connectionStatus = reactive([
  '连接中...','连接成功！','连接失败！'
])
const status = ref(0)

const message = ref('')
const send = () => {
  console.log(message.value)
}

const onReceive = (data: unknown) => {
  console.log( '接收到消息')
  console.log( data)
}

const onOpen = (id:string) => {
  console.log( '连接成功' + id)
  status.value = 1
}

usePeer({
  onReceive,
  onOpen
})
</script>

<template>
 <div>

<h3>
  {{connectionStatus[status]  }}
</h3>
<input v-model="message">
<button @click="send">发送</button>
</div>
</template>
