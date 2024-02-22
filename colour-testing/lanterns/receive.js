function init(){

  window.socketMapper = new SocketMapper();
  socketMapper.socket.on('midi', (msg) => {
    
  //   if(msg.id.colour && msg.type=='cc' && msg.message[2] > 0){
  //       document.body.style.backgroundColor = msg.id.colour;
  //       console.log(msg);
  //   }
    if(msg.type=='cc'){
      //   document.querySelector('#range').value = msg.message[2];
      document.body.backgroundColor = `rgba(255, 255, 255, ${msg.message[2/127]})`;
    }
  });
}
init();
