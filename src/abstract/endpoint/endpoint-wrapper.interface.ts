export interface IEndpointWrapper {
    readonly pipeline: any;
    readonly endpoint: any;
    readonly endpointName: string;
    readonly createOptions: any;

    on(event: "MediaFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingIn", listener: (event: any) => void): this;

    on(event: "MediaFlowingOut", listener: (event: any) => void): this;

    on(event: "MediaStoppedFlowingOut", listener: (event: any) => void): this;

    init(): Promise<void>;

    connect(sink: IEndpointWrapper): Promise<void>;

    disconnect(sink: IEndpointWrapper): Promise<void>;

    close(): Promise<void>;
}