import { SdpEndpointWrapper } from 'abstract/sdp/sdp-endpoint-wrapper';

/**
 * Represents an endpoint for receiving RTP streams.
 *
 * @export
 * @class RtpEndpointWrapper
 * @extends {SdpEndpointWrapper}
 */
export class RtpEndpointWrapper extends SdpEndpointWrapper {
    constructor(pipeline: any, sdpOffer: string) {
        super(pipeline, sdpOffer);

        this._endpointName = "RtpEndpoint";
    }
}