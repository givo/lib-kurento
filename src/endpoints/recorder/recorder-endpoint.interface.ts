import { IEndpointWrapper } from "../../abstract/endpoint/endpoint-wrapper.interface";

export interface IRecorderEndpointWrapper extends IEndpointWrapper {
    on(event: "RecordingStarted", listener: (event: any) => void): this;

    on(event: "RecordingStopped", listener: (event: any) => void): this;
}