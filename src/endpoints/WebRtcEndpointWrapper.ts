import { SdpEndpointWrapper } from '../abstract/SdpEndpointWrapper';
let kurento: any = require('kurento-client');

export class WebRtcEndpointWrapper extends SdpEndpointWrapper {
    private _clientIceCandidatesQueue: any[];

    /**
     * Creates an instance of WebRtcEndpointHandler.
     * Handles ICE mechanism
     * 
     * @param {*} pipeline 
     * @memberof WebRtcEndpointWrapper
     */
    constructor(pipeline: any, clientSdpOffer: string) {
        super(pipeline, clientSdpOffer);

        this._endpointName = "WebRtcEndpoint";
        this._clientIceCandidatesQueue = [];
    }

    public async addClientIceCandidate(candidate) {
        if (!this._endpoint) {
            this._clientIceCandidatesQueue.unshift(candidate);
        }
        else {
            await this._endpoint.addIceCandidate(candidate);
        }
    }

    public async init() {

        // Create endpoint and process client's sdp
        await super.init();

        // emit `ServerIceCandidate` event when kurento generates an ice candidate, 
        this._endpoint.on('OnIceCandidate', (event: any) => {
            let candidate = kurento.getComplexType('IceCandidate')(event.candidate);

            // emit ServerIceCandidate with kurento's new candidate 
            this.emit('ServerIceCandidate', candidate);
        });

        await this._endpoint.gatherCandidates();

        // Clear waiting candidates from FIFO
        while(this._clientIceCandidatesQueue.length){
            let currentCandidate = this._clientIceCandidatesQueue.pop();

            await this._endpoint.addIceCandidate(currentCandidate);
        }
    }
}