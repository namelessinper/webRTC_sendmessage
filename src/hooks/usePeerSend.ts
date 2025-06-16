import type { peerUserInfo } from "./peerTypes"
import dayjs from "dayjs"

interface peerProps {
    userInfo: peerUserInfo
}

type peerSendStatus = 'success' | 'error' | 'warning' | 'info' | 'closed'
type peerSendType = 'message' | 'data' | 'audio' | 'video'


export interface peerDataReturn extends peerProps {
    data: {
        status: peerSendStatus
        type: peerSendType
        data: any,
        time: string
    }
}

export interface peerSendReturn {
    usePeerData: (data: any, status?: peerSendStatus) => peerDataReturn
}

export function usePeerSend({
    userInfo
}: peerProps): peerSendReturn {

    const usePeerData = (data: any, status?: peerSendStatus): peerDataReturn => {
        return {
            userInfo,
            data: {
                status: status || 'info',
                data,
                type: 'data',
                time: dayjs().format('DD/MM/YYYY HH:mm:ss')

            },
        }
    }

    return {
        usePeerData,
    }
}

