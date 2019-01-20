import * as kurento from 'kurento-client';
import * as libKurento from '../index';
import { createPipeline, connectToKurentoServer } from '../utils/kurento-utils';

jest.setTimeout(99999);

const kmsUri = "ws://192.168.32.130:8888/kurento";
const rtpSdpOffer: string = "";     // get sdp from somewhere
const clientSdpOffer: string = "";  // get sdp from client using any kind of singling communication

function sendServerIceCandidate(candidate) {
    // send ice candidate to client
    // for example:
    // webSocket.send(JSON.stringify( { candidate: candidate } ))
}

test('e2e', async () => {
    // connect to kurento
    const kurentoClient = await connectToKurentoServer(kmsUri);

    // create a pipeline
    const pipeline = await createPipeline(kurentoClient);

    // create RTSP and RTP endpoints
    const rtpEndpoint = new libKurento.RtpEndpointWrapper(pipeline, rtpSdpOffer);
    const rtspEndpoint = new libKurento.PlayerEndpointWrapper(pipeline, { uri: 'rtsp://192.168.1.100/stream1', networkCache: 0 /* low latency */ });

    // init
    await rtpEndpoint.init();
    await rtspEndpoint.init();

    // an example for accessing kurento-client`s instance:
    await (rtpEndpoint.endpoint as any).setMaxOutputBitrate(0); // unlimited bitrate

    // start receiving feed from the rtsp source
    await rtspEndpoint.play();

    // create a WebRTC endpoint
    let webRTCEndpoint = new libKurento.WebRtcEndpointWrapper(pipeline, clientSdpOffer);

    // when the server's ice candidates are collected send them to the client
    webRTCEndpoint.on("ServerIceCandidate", sendServerIceCandidate);

    // init the WebRTC endpoint
    await webRTCEndpoint.init();

    await rtspEndpoint.connect(webRTCEndpoint as libKurento.WebRtcEndpointWrapper);
    await rtpEndpoint.connect(webRTCEndpoint as libKurento.WebRtcEndpointWrapper);
});