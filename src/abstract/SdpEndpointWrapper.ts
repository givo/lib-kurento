import { EndpointWrapper } from './EndpointWrapper';

export abstract class SdpEndpointWrapper extends EndpointWrapper {
    _sdpOffer: string;
    _sdpAnswer: string;

    /**
     * Adds SDP negotiation capability.
     * Processes the received sdp offer at init() and generates an sdp answer.
     * 
     * @param {*} pipeline 
     * @param {string} [sdpOffer=""] 
     * @memberof SdpEndpointWrapper
     */
    constructor(pipeline: any, sdpOffer: string) {
        super(pipeline);

        this._sdpOffer = sdpOffer;
        this._sdpAnswer = "";
    }

    public async init() {
        await super.init();

        // process sdp offer
        this._sdpAnswer = await this._endpoint.processOffer(this._sdpOffer);
        
        this.emit("SdpAnswerCreated", this._sdpAnswer);
    }
} 