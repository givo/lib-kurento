import { SdpEndpointWrapper } from './abstract/SdpEndpointWrapper';
import * as async from 'async';
let kurento: any = require('kurento-client');

export class WebRtcEndpointWrapper extends SdpEndpointWrapper{
    private _iceCandidateFIFO: Array<any>;

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
    }

    init(callback: (err: any, result: any) => void) {
        let self = this;

        async.waterfall([
            //
            // Create endpoint and process client's sdp
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
            // Clear waiting candidates from FIFO
            // 
            (waterfallCallback: any) => {
                async.retry(1000, (iceCallback) => {
                    if (self._iceCandidateFIFO.length) {
                        // pull candidate from queue
                        var candidate = self._iceCandidateFIFO.shift();

                        // add ice to webrtc endpoint
                        self._endpoint.addIceCandidate(candidate, (candidateErr: any) => {
                            if (candidateErr) {
                                // break loop
                                console.error(`ERROR while getting waiting candidiates! ${candidateErr}`);
                                iceCallback(candidateErr);
                            }

                            console.log('added waiting ice');

                            // continute
                            iceCallback({}, undefined);
                        });
                    }
                    else {
                        // finish iteration
                        console.log('finish iteration');

                        iceCallback(undefined, {});
                    }
                }, (candidateErr, res) => {
                    if (candidateErr) {
                        waterfallCallback(candidateErr);
                    }

                    console.log(`finish loop ${res}`);

                    waterfallCallback(null);
                });
            },
            //
            // gather ice candidates
            //
            (waterfallCallback: any) => {
                // when kurento gets his iceCandidate, send it to the client 
                self._endpoint.on('OnIceCandidate', function(event: any){
                    console.log('kurento generated ice candidate');

                    let candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                    
                    // emit ServerIceCandidate with kurento's new candidate 
                    self.emit('ServerIceCandidate', candidate);                    
                });

                // order ice candidiates gather
                self._endpoint.gatherCandidates(function(err: any) {
                    if (err) {
                        console.error('error at create gatherCandidates');
                        self._pipeline.release();
                        waterfallCallback(err);
                    }

                    console.log('started gathering ice candidates');

                    waterfallCallback(null);
                });
            }
        ], (waterfallErr: any, waterfallResult: any) : void => {
            if(waterfallErr){
                callback(waterfallErr, null);
            }

            callback(null, self);
        });
    }
}