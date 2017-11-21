import { EndpointWrapper } from './EndpointWrapper';
import { default as async } from 'async';

export abstract class SdpEndpointWrapper extends EndpointWrapper {
    _sdpOffer: string;
    _sdpAnswer: string;

    constructor(pipeline: any, sdpOffer = "") {
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
                super.init((initErr: any, sdpEndpoint: any) => {
                    if (initErr) {
                        waterfallCallback(initErr);
                    }

                    waterfallCallback();
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

                        waterfallCallback(self._sdpAnswer);
                    });
                }
            }
        ], (waterfallErr, waterfallResult) => {
            if(waterfallErr){
                callback(waterfallErr, null);
            }

            callback(null, self._sdpAnswer);
        });
    }
} 