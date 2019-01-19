export interface IWebRTCEndpointWrapper{
    on(event: "ServerIceCandidate", listener: (candidate: any) => void): this;
}