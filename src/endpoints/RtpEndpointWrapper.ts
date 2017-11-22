import { EndpointWrapper } from '../abstract/EndpointWrapper';

class RtpEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "RtpEndpoint";
    }
}