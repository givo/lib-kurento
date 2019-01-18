import { EventEmitter } from 'events';

export abstract class EndpointWrapper extends EventEmitter {
    protected _pipeline: any;
    protected _endpoint: any;
    protected _endpointName: string;
    protected _createOptions: any;

    public get endpoint(): any{
        return this._endpoint;
    }

    constructor(pipeline: any) {
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
    public async init() {
        this._endpoint = await this._pipeline.create(this._endpointName, this._createOptions);

        //
        // listenning to media flow states
        //
        this._endpoint.on('MediaFlowInStateChange', (event: any) => {
            console.log(`[FLOW-IN/WebRtc]: ${event.state}`);

            // TODO: emit events
        });

        this._endpoint.on('MediaFlowOutStateChange', (event: any) => {
            console.log(`[FLOW-OUT/WebRtc]: ${event.state}`);
        });
    }

    public connect(endpoint: EndpointWrapper) {
        return this._endpoint.connect(endpoint._endpoint);
    }
}