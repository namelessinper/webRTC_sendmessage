import { type DataConnection } from 'peerjs'
import { type ComputedRef } from 'vue'
import { usePeerSend, type peerDataReturn } from './usePeerSend'
export type connectionState = '连接中...' | '连接成功！' | '连接失败！'

export type receivedData = {
    id: string
    data: peerDataReturn
}

export type peerUserInfo = {
    username: string
    id: string
}

export type peerOptions = {
    peerId: string
    onMainReceive?: (data: receivedData) => void
    onOpen?: (data: peerUserInfo) => void
    onConnected?: (conn: DataConnection) => void
    onConnectRecive?: (conn: receivedData) => void
}

export type peerReturn = {
    open: () => void
    connect: (targetPeerId: string) => void
    send: (conn: DataConnection, data: any) => peerDataReturn
}

export type connectsData = {
    conn: DataConnection
    reciveData: peerDataReturn[],
    userInfo: peerUserInfo | null
}

export type peerProviderOptions = {
    connectionState: ComputedRef<connectionState>,
    connects: connectsData[],
    userInfo: peerUserInfo | null
    connectionActions: peerReturn | null
    actions:{
        sendData: ((id: string, data: any) => void) | null
    }
}