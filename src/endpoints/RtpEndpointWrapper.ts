import { EndpointWrapper } from '../abstract/EndpointWrapper';


/**
 * Represents an endpoint for receiving RTP streams.
 *
 * @class RtpEndpointWrapper
 * @extends {EndpointWrapper}
 */
class RtpEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "RtpEndpoint";
    }
}