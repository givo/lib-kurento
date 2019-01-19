export { EndpointWrapper } from './abstract/endpoint-wrapper';
export { SdpEndpointWrapper } from './abstract/sdp-endpoint-wrapper';
export { PlayerEndpointWrapper } from './endpoints/player-endpoint-wrapper';
export { RecorderEndpointWrapper } from './endpoints/recorder-endpoint-wrapper';
export { RtpEndpointWrapper } from './endpoints/rtp-endpoint-wrapper';
export { WebRtcEndpointWrapper } from './endpoints/webrtc-endpoint-wrapper';
export { connectToKurentoServer, createPipeline } from './utils/kurento-utils';