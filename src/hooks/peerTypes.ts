import { type DataConnection } from 'peerjs'
import { type ComputedRef } from 'vue'

export type connectionState = '连接中...' | '连接成功！' | '连接失败！'

export type receivedData = {
    id: string
    data: unknown
}

export type openOptions = {
    username: string
    id: string
}

export type peerOptions = {
    peerId: string
    onMainReceive?: (data: receivedData) => void
    onOpen?: (data: openOptions) => void
    onConnected?: (conn: DataConnection) => void
    onConnectRecive?: (conn: receivedData) => void
}

export type peerReturn = {
    open: () => void
    connect: (targetPeerId: string) => void
}

export type peerProviderOptions = {
    connectionState: ComputedRef<connectionState>,
    connects: DataConnection[],
    userInfo: openOptions | null
    connectionActions: peerReturn | null
}