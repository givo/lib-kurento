export interface IRecorderEndpointWrapper{
    on(event: "RecordingStarted", listener: () => void): this;

    on(event: "RecordingStopped", listener: () => void): this;
}