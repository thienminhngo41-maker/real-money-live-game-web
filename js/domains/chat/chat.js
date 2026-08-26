import {addChat,startChat,stopChat} from '../../services/chat.js';

export {addChat,startChat,stopChat};

export function handleSubmit(event){
  if(event.target.id!=='chat-form')return false;
  event.preventDefault();
  const input=document.querySelector('#chat-input');
  if(input?.value.trim()){
    addChat('You',input.value.trim());
    input.value='';
  }
  return true;
}

export function focusInput(){
  document.querySelector('#chat-input')?.focus();
}
