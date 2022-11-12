var socket = io();
const form = document.getElementById('send_container');
const messageInput = document.getElementById('message_inp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == 'left') {
      audio.play();
  }
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
})

const myname = prompt("Enter your name to join").toUpperCase();
socket.emit('new-user-joined', myname);

socket.on('user-joined', myname => {
    append(`${myname} joined the chat`, 'left')
})
socket.on('receive', data => {
    append(`${data.myname}: ${data.message}`, 'left')
})
socket.on('left', myname => {
    append(`${myname} left the chat`, 'left')
})

