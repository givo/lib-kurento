import { EndpointWrapper } from '../abstract/EndpointWrapper';

class RtpEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "PlayerEndpoint";
    }

    // TODO: implement play, stop.. 
}