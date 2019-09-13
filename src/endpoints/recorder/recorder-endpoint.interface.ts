import { IEndpointWrapper } from "../../abstract/endpoint/endpoint-wrapper.interface";

export interface IRecorderEndpointWrapper extends IEndpointWrapper {
    on(event: "MediaFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaFlowingOut", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingOut", listener: (event: any) => void): this;
    
    on(event: "RecordingStarted", listener: (event: any) => void): this;

    on(event: "RecordingStopped", listener: (event: any) => void): this;
}