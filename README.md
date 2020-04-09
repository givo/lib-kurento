# Lib-Kurento

A typescript library for simplifying the use of Kurento in Node.js.

## Motivation

Kurento Media server is controlled through the API it exposes, so we, the application developers use client implementations like `kurento-client-js` to interact with the media server.
The problem with `kurento-client-js` is that the package was automatically generated, therefore the source code is not readable, hard to use and requires a lot of repetitive code. The API becomes even harder to handle as the application becomes larger and uses more then one streaming protocol. Therefore I have created a simple library that simplifies the initialization process of the common endpoints types (And I even handles some bugs in the library for you).

## Install

```
npm i --save lib-kurento
```

## Usage

### General Example

An example for creating a pipeline with two types of sources, RTSP and RTP that are sent to clients through WebRTC:

![Example Design](https://raw.githubusercontent.com/givo/lib-kurento/master/example-design.png)

```typescript
import * as libKurento from 'lib-kurento';

const kmsUri = "ws://192.168.32.130:8888/kurento";
const rtpSdpOffer: string = "";     // get sdp from somewhere
const clientSdpOffer: string = "";  // get sdp from client using any kind of a signaling communication
const socket: WebSocket;

function sendServerIceCandidate(candidate) {
    // send ice candidate to client
    // for example:
    socket.send(JSON.stringify( { candidate: candidate } ))
}

async function main(){
    // connect to kurento
    const kurentoClient = await libKurento.connectToKurentoServer(kmsUri);

    // create a pipeline
    const pipeline = await libKurento.createPipeline(kurentoClient);

    // create RTSP and RTP endpoints
    const rtpEndpoint = new libKurento.RtpEndpointWrapper(pipeline, rtpSdpOffer);

    const rtspEndpoint = new libKurento.PlayerEndpointWrapper(pipeline, {
        uri: 'rtsp://192.168.1.100/stream1',
        networkCache: 0 /* low latency */ 
    });

    // initialization simplified!
    await rtpEndpoint.init();
    await rtspEndpoint.init();

    // Accessing kurento-client`s instances is allowed as follows:
    await (rtpEndpoint.endpoint as any).setMaxOutputBitrate(0); // unlimited bitrate

    // start receiving feed from the rtsp source
    await rtspEndpoint.play();

    // create a WebRTC endpoint
    let webRtcEndpoint = new libKurento.WebRtcEndpointWrapper(pipeline, clientSdpOffer);

    // when the server's ice candidates are collected send them to the client
    webRtcEndpoint.on("ServerIceCandidate", sendServerIceCandidate);

    // init the WebRTC endpoint, also starts gathering ICE candidates from the media server instance
    await webRtcEndpoint.init();

    // receive client ice candidates
    socket.on('message', (msg: any) => {
        const parsedMsg = JSON.parse(msg);

        // add the client's ICE candidate to it's matching WebRTC endpoint
        // IMPORTANT NOTE: `lib-kurento` stores candidates in a queue in order
        // to add them only when the endpoint is ready
        webRtcEndpoint.addClientIceCandidate(parsedMsg.candidate);
    })

    // connect source endpoints to output endpoints and feed will start flowing to clients
    await rtspEndpoint.connect(webRtcEndpoint);
    await rtpEndpoint.connect(webRtcEndpoint);
});
```

### Recording Example

A very simplified example for recording a RTSP feed from an IP camera to a MKV file:

![Recoring Example Design](https://raw.githubusercontent.com/givo/lib-kurento/master/recording-example.png)

```typescript

import * as libKurento from 'lib-kurento';
const kmsUri = "ws://192.168.32.130:8888/kurento";
const cameraRtspUrl = "rtsp://192.168.1.32/channels/1";
const socket: WebSocket;

async function startStreaming(clientSdpOffer: string){
    // connect to kurento
    const kurentoClient = await libKurento.connectToKurentoServer(kmsUri);

    // create a pipeline
    const pipeline = await libKurento.createPipeline(kurentoClient);

    // create a RTSP endpoint
    const rtspEndpoint = new libKurento.PlayerEndpointWrapper(pipeline, { 
        uri: cameraRtspUrl,
        networkCache: 0 /* low latency */ 
    });

    // create recorder
    const recorderEndpoint = new libKurento.RecorderEndpointWrapper(pipeline, {
        uri: '/user/home/recordings/recording1.mkv',
        mediaProfile: 'MKV_VIDEO_ONLY'
    });

    // create a WebRTC endpoint
    let webRtcEndpoint = new libKurento.WebRtcEndpointWrapper(pipeline, clientSdpOffer);

    // when the server's ice candidates are collected send them to the client
    webRtcEndpoint.on("ServerIceCandidate", sendServerIceCandidate);

    // initialization simplified again!
    await rtspEndpoint.init();
    await recorderEndpoint.init();
    await webRtcEndpoint.init();

    // listen to recording events
    recorderEndpoint.on('RecordingStarted', (event) => {
        console.log('recording has started')
    });
    recorderEndpoint.on('RecordingStopped', (event) => {
        console.log('recording has stopped')
    });
    recorderEndpoint.endpoint.addListener('Error', (err) => {
        console.log('recorderEndpoint.endpoint error', err);
    })

    // receive client ice candidates
    socket.on('message', (msg: any) => {
        const parsedMsg = JSON.parse(msg);

        // add the client's ICE candidate to the WebRTC endpoint
        webRtcEndpoint.addClientIceCandidate(parsedMsg.candidate);
    });

    // IP Camera -> WebRTC
    // IP Camera -> MKV file
    await rtspEndpoing.connect(recorderEndpoint);
    await rtspEndpoint.connect(webRtcEndpoint);

    // start receiving feed from IP camera
    await rtspEndpoint.play();

    // start recording
    await recorderEndpoint.record();

    // stop recording after 5s
    setTimeout(async () => {
        await recorderEndpoint.stopRecord();
    }, 5000);
}
```
