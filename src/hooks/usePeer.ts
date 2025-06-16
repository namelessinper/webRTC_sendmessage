import { Peer } from 'peerjs'
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
        peer = new Peer(mainId)
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
                onMainReceive && onMainReceive({ id: conn.peer, data: receivedData})
                if(receivedData.data.status === 'success'){
                    conn.send(usePeerData('连接成功','success'))
                }
            })

        })
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
                    onConnectRecive && onConnectRecive({ id: conn.peer, data:receivedData })
                });
                conn.send(usePeerData( '连接成功','success'))
                resolve(conn)
            });
        })
       
    }

    return {
        open,
        connect
    }

}