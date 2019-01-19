import { EndpointWrapper } from '../abstract/EndpointWrapper';


/**
 * Represents an endpoint with VCR capabilities. Most common use is for receiving a RTSP stream.
 *
 * @class PlayerEndpointWrapper
 * @extends {EndpointWrapper}
 */
class PlayerEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "PlayerEndpoint";
    }

    // TODO: implement play, stop.. 
}