import { EndpointWrapper } from '../abstract/endpoint-wrapper';
import { PlayerEndpointCreateOptions } from './player-endpoint-create-options';


/**
 * Represents an endpoint with VCR capabilities. Most common use is for receiving a RTSP stream.
 *
 * @class PlayerEndpointWrapper
 * @extends {EndpointWrapper}
 */
export class PlayerEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any, createOptions: PlayerEndpointCreateOptions){
        super(pipeline, createOptions);

        this._endpointName = "PlayerEndpoint";
    }

    public play(): Promise<void>{
        return this._endpoint.play();
    }

    public pause(): Promise<void>{
        return this._endpoint.pause();
    }

    public stop(): Promise<void>{
        return this._endpoint.stop();
    }

    public setPosition(position: Number): Promise<void>{
        return 
    }
}