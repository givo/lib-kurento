import { IEndpointWrapper } from "abstract/endpoint/endpoint-wrapper.interface";

export interface IWebRTCEndpointWrapper extends IEndpointWrapper{
    on(event: "ServerIceCandidate", listener: (candidate: any) => void): this;
}