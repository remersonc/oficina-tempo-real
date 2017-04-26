# Referência para WebRTC

## Criar uma nova conexão

`peerConnection = new RTCPeerConnection();`

## Requisitar acesso à câmera/microfone

```
constraints = {audio: true, video: true };
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {})
```

## Adicionar um novo stream

`peerConnection.addStream(stream);`

## Criar um DataChannel

```
sendChannel = peerConnection.createDataChannel('sendChannel');
sendChannel.onopen = () => {}
sendChannel.onclose = () => {}
```

## Enviar mensagens de um DataChannel

`sendChannel.send(message);`

## Receber mensagens de um DataChannel

```
peerConnection.ondatachannel = (evt) => {
  const receiveChannel = evt.channel;

  receiveChannel.onmessage = (evt) => {}
}
```

## Capturar candidatos ICE

`peerConnection.onicecandidate = (evt) => {}`

## Adicionar um candidato ICE

`peerConnection.addIceCandidate(candidate);`

## Capturar um stream remoto

`peerConnection.onaddstream = (evt) => {}`

## Criar uma oferta / definir descrição local

```
peerConnection.createOffer()
.then((offer) => {
  peerConnection.setLocalDescription(offer);
})
```

## Criar uma resposta / definir descrição remota

```
peerConnection.setRemoteDescription(description)
.then(() => peerConnection.createAnswer())
.then((answer) => {
  peerConnection.setLocalDescription(answer);
})
```