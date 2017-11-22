import { EndpointWrapper } from './EndpointWrapper';
import * as async from 'async';

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
    constructor(pipeline: any, sdpOffer:string = "") {
        super(pipeline);

        this._sdpOffer = sdpOffer;
        this._sdpAnswer = "";
    }

    init(callback: (err: any, result: any) => void) {
        let self = this;

        async.waterfall([
            //
            // create endpoint
            //
            (waterfallCallback: any) => {
                super.init((initErr: any, result: any) => {
                    if (initErr) {
                        waterfallCallback(initErr);
                    }

                    waterfallCallback(null);
                });
            },
            //
            // process sdp offer if exists, otherwise sdpAnswer will be empty
            //
            (waterfallCallback: any) => {
                if (self._sdpOffer != "") {
                    self._endpoint.processOffer(self._sdpOffer, (processErr: any, sdpAnswer: string) => {
                        if(processErr){
                            self.error("cannot process sdp offer", processErr);
                            waterfallCallback(processErr);
                        }

                        self._sdpAnswer = sdpAnswer;

                        // emit SdpAnswerCreated event with the sdp answer
                        self.emit('SdpAnswerCreated', sdpAnswer);

                        waterfallCallback(null, self._sdpAnswer);
                    });
                }
            }
        ], (waterfallErr: any, waterfallResult: any) : void => {
            if(waterfallErr){
                callback(waterfallErr, null);
            }

            callback(null, self._sdpAnswer);
        });
    }
} 