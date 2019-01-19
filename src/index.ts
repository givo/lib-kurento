export { EndpointWrapper } from './abstract/endpoint/endpoint-wrapper';
export { SdpEndpointWrapper } from './abstract/sdp/sdp-endpoint-wrapper';
export { PlayerEndpointWrapper } from './endpoints/player/player-endpoint-wrapper';
export { RecorderEndpointWrapper } from './endpoints/recorder/recorder-endpoint-wrapper';
export { RtpEndpointWrapper } from './endpoints/rtp/rtp-endpoint-wrapper';
export { WebRtcEndpointWrapper } from './endpoints/webrtc/webrtc-endpoint-wrapper';
export { connectToKurentoServer, createPipeline } from './utils/kurento-utils';