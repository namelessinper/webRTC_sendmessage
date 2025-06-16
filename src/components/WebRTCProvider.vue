<script setup lang="ts">
import { reactive, ref, provide, computed } from 'vue'
import { NButton, NInput, useMessage } from 'naive-ui'
import type { peerUserInfo, peerOptions, connectionState, peerProviderOptions, receivedData } from '@/hooks/peerTypes'
import { type DataConnection } from 'peerjs'
import { usePeer } from '@/hooks/usePeer';
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

const onReceive = (data: receivedData) => {
    console.log(data)
    const index = peerOptions.connects.findIndex(item => item.conn.peer === data.id)
    if (index !== -1) {
        peerOptions.connects[index].reciveData.push(data.data)
        if(data.data.data.status === 'success'){
            peerOptions.connects[index].userInfo = data.data.userInfo
        }
        console.log(peerOptions)
    }

}

const onMainReceive = (data: receivedData) => {
    onReceive(data)
}

const onConnectRecive = (data: receivedData) => {
    onReceive(data)

}

const onOpen = ({ id, username }: peerUserInfo) => {
    state.value = 1
    peerOptions.userInfo = { id, username }
}

const onConnected = (conn: DataConnection) => {
    console.log('onConnected')
    console.log(conn)
    if (!peerOptions.connects.some(item => item.conn.peer === conn.peer)) {
        peerOptions.connects.push({ conn, reciveData: [],userInfo: null })
    }
    console.log(peerOptions)
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
        onOpen,
        onConnectRecive,
        onConnected
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
