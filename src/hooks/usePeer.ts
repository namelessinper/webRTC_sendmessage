import { Peer } from 'peerjs'
import { type DataConnection } from 'peerjs'
import { HashCode } from '@/utils/HashCode'

type peerOptions = {
    peerId: string
    onMainReceive?: (data: unknown) => void
    onOpen?: (id: string) => void
    onConnected?: (conn: DataConnection) => void
    onConnectRecive?: (conn: unknown) => void
}
export const usePeer = ({
    peerId,
    onMainReceive,
    onConnectRecive,
    onOpen,
    onConnected
}: peerOptions): Promise<DataConnection> => {
    return new Promise((resolve, reject) => {
        let peer: Peer

        const open = async () => {
            return new Promise((resolve, reject) => {
                localStorage.removeItem('peerId_main')
                peer = new Peer(HashCode(peerId))
                peer.on('open', function (id) {
                    console.log('My peer ID is: ' + id)
                    localStorage.setItem('peerId_main', id)
                    onOpen && onOpen(id)
                });
                //监听其他peer的连接
                peer.on('connection', function (conn) {
                    onConnected && onConnected(conn)
                    console.log('Connected from:' + conn.peer);
                    conn.on('data', function (data) {
                        console.log('received from:' + conn.peer);
                        console.log(data);
                        onMainReceive && onMainReceive(data)
                        resolve(conn)
                    })
                })
            })
        }

        const connect = async (targetPeerId: string) => {
            return new Promise((resolve, reject) => {
                const conn = peer.connect(targetPeerId)
                conn.on('open', function () {
                    console.log('Connected to: ' + conn.peer);
                    // Receive messages
                    conn.on('data', function (data) {
                        console.log('Received from', conn.peer);
                        console.log(data);
                        onConnectRecive && onConnectRecive(data)
                    });
                    resolve(conn)
                });
            })
        }

        return {
            open,
            connect
        }
    })

}