import { EventEmitter } from 'events';

export abstract class EndpointWrapper extends EventEmitter{
    protected _pipeline: any;
    protected _endpoint: any;
    protected _endpointName: string;

    constructor(pipeline: any){
        super();

        this._endpointName = "";
        this._pipeline = pipeline;
        this._endpoint = null;
    }
    
    /**
     * Creates endpoint of type `_endpointName`
     * 
     * result - endpoint of type `_endpointName`
     * 
     * @param {(err: any, result: any) => void} callback 
     * @memberof EndpointWrapper* 
     */
    public init(callback: (err: any, result: any) => void) : void {
        let self = this;

        this._pipeline.create(this._endpointName, (err: any, endpoint: any) => {
            if(err){
                self.error('cannot create WebRtcEndpoint', err);
                callback(err, null);
            }

            //
            // listenning to media flow states
            //
            endpoint.on('MediaFlowInStateChange', (event: any) => {
                console.log(`[FLOW-IN/WebRtc]: ${event.state}`);        
                
                // TODO: emit events
            });
            endpoint.on('MediaFlowOutStateChange', (event: any) => {
                console.log(`[FLOW-OUT/WebRtc]: ${event.state}`);
            });

            self._endpoint = endpoint;

            callback(null, endpoint);
        });
    }

    public connect(endpoint: EndpointWrapper, callback: (err: any) => void){
        let self = this;

        this._endpoint.connect(endpoint, (err: any) => {
            if(err){
                console.error('error at connect');
                callback(err);
            }

            callback(null);
        });
    }

    protected error(msg: string, err: any) : void {
        console.error(`ERROR: ${msg}\nCODE: ${err}`);        
    }
}