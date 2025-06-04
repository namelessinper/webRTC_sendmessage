import { Peer } from 'peerjs'

type peerOptions = {
    peerId?: string
    targetPeerId?: string
    onReceive: (data: unknown) => void
    onOpen?: (id: string) => void

}
export const usePeer = ({
    peerId = '',
    onReceive,
    targetPeerId,
    onOpen
}: peerOptions) => {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('peerId_main')
        const peer = new Peer(peerId)
        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id)
            localStorage.setItem('peerId_main', id)
            onOpen && onOpen(id)
            if (targetPeerId) {

                const conn = peer.connect(targetPeerId)
                conn.on('open', function () {
                    console.log('Connected to: ' + conn.peer);
                    // Receive messages
                    conn.on('data', function (data) {
                        console.log('Received from', conn.peer);

                        console.log('Received', data);
                    });

                    // Send messages
                    conn.send('Hello!');
                    console.log(conn.send);

                    resolve({conn})
                });
            }
        });
        //监听其他peer的连接
        peer.on('connection', function (conn) {
            console.log('Connected from:' + conn.peer);
            console.log(conn);

            conn.on('data', function (data) {
                console.log('received from:' + conn.peer);

                onReceive && onReceive(data)
                conn.send(`我收到了! `);
                resolve({conn})

            })
            // Send messages
        })
    })

}