import { EndpointWrapper } from './EndpointWrapper';


/**
 * Represents an instance with SDP negotiation capability.
 *
 * @export
 * @abstract
 * @class SdpEndpointWrapper
 * @extends {EndpointWrapper}
 */
export abstract class SdpEndpointWrapper extends EndpointWrapper {
    _sdpOffer: string;
    _sdpAnswer: string;


    /**
     * Creates an instance of SdpEndpointWrapper.
     * @param {*} pipeline The pipeline that owns this endpoint
     * @param {string} sdpOffer The Sdp offer of the source peer
     * @memberof SdpEndpointWrapper
     */
    constructor(pipeline: any, sdpOffer: string) {
        super(pipeline);

        this._sdpOffer = sdpOffer;
        this._sdpAnswer = "";
    }


    /**
     * Creates the specified endpoint, processes the received sdp offer and generates an sdp answer.
     *
     * @memberof SdpEndpointWrapper
     */
    public async init() {
        await super.init();

        // process sdp offer
        this._sdpAnswer = await this._endpoint.processOffer(this._sdpOffer);
        
        this.emit("SdpAnswerCreated", this._sdpAnswer);
    }
} 