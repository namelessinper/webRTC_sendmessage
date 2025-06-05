<script setup lang="ts">
import { reactive, ref, provide, onMounted } from 'vue'
import { NButton, NInput, useMessage } from 'naive-ui'
import { usePeer } from '@/hooks/usePeer';
import type { DataConnection } from 'peerjs'
const username = ref('')
const message = useMessage()
type connectionState = '连接中...' | '连接成功！' | '连接失败！'

const connectionStatus: connectionState[] = [
    '连接中...', '连接成功！', '连接失败！'
]
let state: number = 0
const peerOptions = reactive<{
    connectionState: connectionState,
    connects: DataConnection[]
}>({
    connectionState: connectionStatus[state],
    connects: []
})

provide('peerOptions', peerOptions)

const onMainReceive = (data: unknown) => {
    console.log(data)
}

const onOpen = (id: string) => {
    state = 1
}



const start = async () => {
    if (!username.value){
        message.error('请输入你的昵称')
        return
    } 
    console.log('启动')
    state = 0
    const conn = await usePeer({
        peerId: username.value,
        onMainReceive,
        onOpen
    })
    peerOptions.connects.push(conn)
}


</script>
<template>
    <div>
        <div class="flex">
            <n-input v-model:value="username" type="text" placeholder="请输入你的昵称" />
            <n-button @click="start">确定</n-button>
        </div>


        <slot v-if="state !== 0"></slot>
    </div>
</template>
