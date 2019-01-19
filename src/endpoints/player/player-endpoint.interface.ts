export interface IPlayerEndpointWrapper {
    play(): Promise<void>;

    pause(): Promise<void>;

    stop(): Promise<void>;

    setPosition(position: Number): Promise<void>;
}