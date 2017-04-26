const hasCamera = false;

const localVideo = document.querySelector('video.local');
const remoteVideo = document.querySelector('video.remote');

const localCanvas = document.querySelector('canvas.local');
const localContext = localCanvas.getContext('2d');
const remoteCanvas = document.querySelector('canvas.remote');
const remoteContext = remoteCanvas.getContext('2d');

if(hasCamera) {
  localVideo.style.display = 'block';
  remoteVideo.style.display = 'block';
  localCanvas.style.display = 'none';
  remoteCanvas.style.display = 'none';
}

(function renderVideo() {
  localContext.drawImage(localVideo, 0, 0, localCanvas.width, localCanvas.height);
  remoteContext.drawImage(remoteVideo, 0, 0, remoteCanvas.width, remoteCanvas.height);

  window.requestAnimationFrame(renderVideo);
}());

const socket = io('http://localhost:4567');

socket.on('socket index', (index) => {
  let fallbackSrc;

  if(parseInt(index) % 2 === 0) {
    fallbackSrc = '/videos/video1.mp4';
  }
  else {
    fallbackSrc = '/videos/video2.mp4';
  }

  if(hasCamera) {
    /*

      - Requisitar acesso à câmera
      - Adicionar stream ao srcObject do elemento de Vídeo local

    */
  }
  else {
    const localStream = localCanvas.captureStream(25);
    pc.addStream(localStream);

    localVideo.src = fallbackSrc;
  }
});

const pc = new RTCPeerConnection();

/*
  Criar peer connection
*/

/*
  - Capturar candidatos ICE
  - Enviar candidatos para o servidor de sinalização
*/

/*
  - Receber candidatos do servidor de sinalização
  - Adicionar candidatos ICE
*/

/*
  Adicionar handler para capturar adição de stream remoto
*/

const button = document.querySelector('button');
button.onclick = connect;

function connect() {
  /*
    - Criar oferta
    - Definir oferta como descrição local
    - Enviar oferta para servidor de sinalização
  */
}

/*
  - Receber oferta do servidor de sinalização
  - Definir oferta como descrição remota
  - Criar resposta
  - Definir resposta como descrição local
  - Enviar resposta para servidor de sinalização
*/

/*
  - Receber resposta do servidor de sinalização
  - Definir resposta como descrição remota
*/