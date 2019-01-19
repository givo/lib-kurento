import { EndpointWrapper } from '../../abstract/endpoint/endpoint-wrapper';
import { PlayerEndpointCreateOptions } from './player-create-options';
import { IPlayerEndpointWrapper } from './player-endpoint.interface';

/**
 * Represents an endpoint with VCR capabilities. Most common use is for receiving a RTSP stream.
 *
 * @class PlayerEndpointWrapper
 * @extends {EndpointWrapper}
 */
export class PlayerEndpointWrapper extends EndpointWrapper implements IPlayerEndpointWrapper {
    constructor(pipeline: any, createOptions: PlayerEndpointCreateOptions) {
        super(pipeline, createOptions);

        this._endpointName = "PlayerEndpoint";
    }

    public play(): Promise<void> {
        return this._endpoint.play();
    }

    public pause(): Promise<void> {
        return this._endpoint.pause();
    }

    public stop(): Promise<void> {
        return this._endpoint.stop();
    }

    public setPosition(position: Number): Promise<void> {
        return
    }
}