import { EndpointWrapper } from '../abstract/EndpointWrapper';


/**
 * Sink endpoint that records a received stream.
 *
 * @class RecorderEndpointWrapper
 * @extends {EndpointWrapper}
 */
class RecorderEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "RecorderEndpoint";
    }
}