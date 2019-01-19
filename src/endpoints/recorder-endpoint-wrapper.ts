import { EndpointWrapper } from '../abstract/endpoint-wrapper';


/**
 * Sink endpoint that records a received stream.
 *
 * @class RecorderEndpointWrapper
 * @extends {EndpointWrapper}
 */
export class RecorderEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "RecorderEndpoint";
    }
}