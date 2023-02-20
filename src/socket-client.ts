import { Manager, Socket } from "socket.io-client";
let socket: Socket;
export const connectToServer=(token: string)=>{
    const manager= new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders:{
            hola: 'mundo',
            authentication: token,
        }
    });
    


    socket?.removeAllListeners();
    socket=manager.socket('/');
    addListener(socket);
}

const addListener=(socket: Socket)=>{
    const serverStatusLabel= document.querySelector('#server_status')!;
// TODO cliente-ul
    const clientUl=document.querySelector('#cliente-ul')!

    const messageInput=document.querySelector<HTMLInputElement>('#message-input')!;
    const messageForm=document.querySelector<HTMLFormElement>('#message-form')!;
    const MessageUl= document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', ()=>{
        serverStatusLabel.innerHTML='connected';
        //console.log('connected');
    })

    socket.on('disconnect', ()=>{
        serverStatusLabel.innerHTML='disconnected';
        //console.log('disconnected');

    })

    socket.on('clients-updated', (clients: string [])=>{
        //console.log({clients})
        let clientsHtml= ``;
        clients.forEach(clientId =>{
            clientsHtml+=`<li>${clientId}</li>`
        });
        clientUl.innerHTML=clientsHtml;
    });

    messageForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if (messageInput.value.trim().length<=0) return;

        socket.emit('messagge-from-client', {
            id: 'YO!!',
            messagge: messageInput.value
        });

        messageInput.value='';
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string})=>{
        const newMessage=`
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>
        `;
        const li= document.createElement('li');
        li.innerHTML=newMessage;
        MessageUl.append(li);
    })
}