import { IEndpointWrapper } from "../../abstract/endpoint/endpoint-wrapper.interface";

export interface IPlayerEndpointWrapper extends IEndpointWrapper {
    play(): Promise<void>;

    pause(): Promise<void>;

    stop(): Promise<void>;

    setPosition(position: Number): Promise<void>;
}
