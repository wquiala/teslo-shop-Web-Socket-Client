import { connectToServer } from './socket-client';
import './style.css'
/* import typescriptLogo from './typescript.svg';
import { setupCounter } from './counter'
import { connectToServer } from './socket-client';
 */
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id='jwt-token' placeholder='Json Web Token'/>
    <button id='btn-connect'>Connect</button>
    <span id='server_status'>offline</span>

    <ul id='cliente-ul'></ul>

    <form id='message-form'>
    <input placeholder='message' id='message-input' />
    </form>

    <h3>Messagges</h3>
    <ul id='messages-ul'></ul>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
//connectToServer();

const jwtToken=document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect=document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', ()=>{
  if(jwtToken.value.trim().length<=0) return alert('Enter a valid JWT');
  connectToServer(jwtToken.value);
});

