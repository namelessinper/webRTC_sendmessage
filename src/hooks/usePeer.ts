import { type DataConnection, Peer } from 'peerjs'
import { HashCode } from '@/utils/HashCode'
import type { peerOptions, peerReturn } from './peerTypes'
import { usePeerSend, type peerDataReturn } from './usePeerSend'

export const usePeer = ({
    peerId,
    onMainReceive,
    onConnectRecive,
    onOpen,
    onConnected
}: peerOptions): peerReturn => {
    let peer: Peer
    const mainId = HashCode(peerId)
    const { usePeerData } = usePeerSend({ userInfo: { id: mainId, username: peerId } })

    const open = () => {
        localStorage.removeItem('peerId_main')
        peer = new Peer(mainId, {
            debug: 3, config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    {
                        urls: [`turn:8.148.71.161:3478`, `turns:8.148.71.161:5349`],
                        username:'liuyx',
                        credential: 'yxliu',
                      },
                ]
            },
        })
        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id)
            localStorage.setItem('peerId_main', id)
            onOpen && onOpen({ id, username: peerId })
        });
        //监听其他peer的连接
        peer.on('connection', function (conn) {
            onConnected && onConnected(conn)
            console.log('Connected from:' + conn.peer);

            conn.on('data', function (data) {
                const receivedData = data as peerDataReturn
                console.log('received from:' + conn.peer);
                onMainReceive && onMainReceive({ id: conn.peer, data: receivedData })
                if (receivedData.data.status === 'success') {
                    conn.send(usePeerData('连接成功', 'success'))
                }
            })
            conn.on('close', handleClose);
            conn.on('error', handleError);
        })

        peer.on('disconnected', handleDisconnected);
        peer.on('error', handleError);
        peer.on('close', handleClose);
    }

    const connect = (targetPeerId: string) => {
        return new Promise((resolve, reject) => {
            const conn = peer.connect(targetPeerId)
            conn.on('open', function () {
                onConnected && onConnected(conn)
                console.log('Connected to: ' + conn.peer);

                // Receive messages
                conn.on('data', function (data) {
                    const receivedData = data as peerDataReturn

                    console.log('Received from', conn.peer);
                    onConnectRecive && onConnectRecive({ id: conn.peer, data: receivedData })
                });

                conn.on('close', handleClose);
                conn.on('error', handleError);
                conn.send(usePeerData('连接成功', 'success'))
                resolve(conn)
            });
        })

    }

    const send = (conn: DataConnection, data: any): peerDataReturn => {
        const sendData = usePeerData(data)
        conn.send(sendData)
        return sendData
    }

    return {
        open,
        connect,
        send
    }

}


function handleError(error: any) {
    console.log('error')
    console.log(error)
}

function handleClose() {
    console.log('close')
}

function handleDisconnected() {
    console.log('handleDisconnected')
}