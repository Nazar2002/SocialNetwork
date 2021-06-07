let ws:WebSocket;
const subcribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}
export type StatusType = 'pending' | 'ready' | 'error'
type subscribersType= (messages:chatMessageType[])=>void
type EventsNamesType = 'messages-received' | 'status-changed'
type MessagesReceivedSubscriberType = (messages: chatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

    const closeHandler = ()=> {
        notifySubscribersAboutStatus('pending')
    }
    function cleanUp(){
        ws?.removeEventListener('close',closeHandler)
        ws?.removeEventListener('message',messageHandler)
    }
    function createChanel():void{
        cleanUp()
        ws?.close()
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('close',closeHandler)
        ws.addEventListener('message',messageHandler)
        ws.addEventListener('open', openHandler)
        ws.addEventListener('error', errorHandler)

    }
    let messageHandler = (e:MessageEvent) => {
        let newMessage = JSON.parse(e.data)
        subcribers['messages-received'].forEach(s => s(newMessage))
    }
    const openHandler = () => {
        notifySubscribersAboutStatus('ready')
    }
    const errorHandler = () => {
        notifySubscribersAboutStatus('error')
        console.error('REFRESH PAGE')
    }
    const notifySubscribersAboutStatus = (status: StatusType) => {
        subcribers['status-changed'].forEach(s => s(status))
    }
    
export const ChatApi = {
    start(){
        createChanel()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message:string){
        ws?.send(message)
    },
    stop(){
        subcribers['messages-received'] = []
        subcribers['status-changed'] = []
        ws?.close()
        cleanUp()
    }
}