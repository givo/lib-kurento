import { EndpointWrapper } from '../abstract/EndpointWrapper';

class RecorderEndpointWrapper extends EndpointWrapper{
    constructor(pipeline: any){
        super(pipeline);

        this._endpointName = "RecorderEndpoint";
    }
}