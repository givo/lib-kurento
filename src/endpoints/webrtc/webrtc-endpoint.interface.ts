import { IEndpointWrapper } from "../../abstract/endpoint/endpoint-wrapper.interface";

export interface IWebRTCEndpointWrapper extends IEndpointWrapper{
    on(event: "MediaFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaFlowingOut", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingOut", listener: (event: any) => void): this;
    
    on(event: "ServerIceCandidate", listener: (candidate: any) => void): this;
}