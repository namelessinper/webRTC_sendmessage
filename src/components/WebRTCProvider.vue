<script setup lang="ts">
import { reactive, ref, provide, computed, type ComputedRef } from 'vue'
import { NButton, NInput, useMessage } from 'naive-ui'
import type { openOptions, peerOptions, peerReturn, connectionState, peerProviderOptions } from '@/hooks/peerTypes'

import { usePeer } from '@/hooks/usePeer';
import type { DataConnection } from 'peerjs'
const username = ref('')
const message = useMessage()

const connectionStatus: connectionState[] = [
    '连接中...', '连接成功！', '连接失败！'
]
let state = ref(0)
const peerOptions = reactive<peerProviderOptions>({
    connectionState: computed(
        () => connectionStatus[state.value]
    ),
    connects: [],
    userInfo: null,
    connectionActions: null
})

provide('peerOptions', peerOptions)

const onMainReceive = (data: { id: string, data: unknown }) => {
    console.log(data)
}

const onOpen = ({ id, username }: openOptions) => {
    state.value = 1
    peerOptions.userInfo = { id, username }
}



const start = async () => {
    if (!username.value) {
        message.error('请输入你的昵称')
        return
    }
    console.log('启动')
    state.value = 0
    const { open, connect } = usePeer({
        peerId: username.value,
        onMainReceive,
        onOpen
    })
    peerOptions.connectionActions = {
        open,
        connect
    }
    open()
}


</script>
<template>
    <div>
        <div class="flex" v-if="state === 0">
            <n-input v-model:value="username" type="text" placeholder="请输入你的昵称" />
            <n-button @click="start">确定</n-button>
        </div>


        <slot v-else></slot>
    </div>
</template>
