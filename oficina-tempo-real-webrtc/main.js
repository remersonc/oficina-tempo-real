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
    navigator.mediaDevices.getUserMedia({audio: true, video: true })
    .then((stream) => {
      pc.addStream(stream);

      localVideo.srcObject = stream;
    })
    .catch(console.warn);
  }
  else {
    const localStream = localCanvas.captureStream(25);
    pc.addStream(localStream);

    localVideo.src = fallbackSrc;
  }
});

const pc = new RTCPeerConnection();

const sendChannel = pc.createDataChannel('sendChannel');

sendChannel.onopen = () => {
  sendChannel.send('sending');
}

sendChannel.onclose = () => console.log('[datachannel close]')

pc.ondatachannel = (evt) => {
  const receiveChannel = evt.channel;

  receiveChannel.onmessage = (evt) => {
    console.log(evt.data);
  }
}

pc.onicecandidate = (evt) => {
  if(evt.candidate !== null) {
    socket.emit('enviar candidato', evt.candidate);
  }
}

pc.onaddstream = (evt) => {
  remoteVideo.srcObject = evt.stream;
}

const button = document.querySelector('button');
button.onclick = connect;

function connect() {
  pc.createOffer()
  .then((offer) => {
    pc.setLocalDescription(offer);

    socket.emit('enviar oferta', offer);
  })
  .catch(console.warn)
}

socket.on('receber oferta', (description) => {
  pc.setRemoteDescription(description)
  .then(() => pc.createAnswer())
  .then((answer) => {
    pc.setLocalDescription(answer);

    socket.emit('enviar resposta', answer)
  })
  .catch(console.warn)
});

socket.on('receber resposta', (description) => {
  pc.setRemoteDescription(description)
  .catch(console.warn);
});

socket.on('receber candidato', (candidate) => {
  pc.addIceCandidate(candidate)
  .catch(console.warn);
});