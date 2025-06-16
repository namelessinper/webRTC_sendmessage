import { Peer } from 'peerjs'
import { HashCode } from '@/utils/HashCode'
import type { peerOptions, peerReturn } from './peerTypes'

export const usePeer = ({
    peerId,
    onMainReceive,
    onConnectRecive,
    onOpen,
    onConnected
}: peerOptions): peerReturn => {
    let peer: Peer

    const open = () => {
        localStorage.removeItem('peerId_main')
        peer = new Peer(HashCode(peerId))
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
                console.log('received from:' + conn.peer);
                console.log(data);
                onMainReceive && onMainReceive({ id: conn.peer, data })
            })
        })
    }

    const connect = (targetPeerId: string) => {
        const conn = peer.connect(targetPeerId)
        conn.on('open', function () {
            console.log('Connected to: ' + conn.peer);
            // Receive messages
            conn.on('data', function (data) {
                console.log('Received from', conn.peer);
                console.log(data);
                onConnectRecive && onConnectRecive({ id: conn.peer, data })
            });
        });
    }

    return {
        open,
        connect
    }

}