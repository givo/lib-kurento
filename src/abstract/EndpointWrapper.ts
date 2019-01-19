import { EventEmitter } from 'events';


/**
 * Represents the base instance of all of Kurento's endpoints.
 *
 * @export
 * @abstract
 * @class EndpointWrapper
 * @extends {EventEmitter}
 */
export abstract class EndpointWrapper extends EventEmitter {
    protected _pipeline: any;
    protected _endpoint: any;
    protected _endpointName: string;
    protected _createOptions: any;

    public get endpoint(): any {
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
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public async init(): Promise<void> {
        this._endpoint = await this._pipeline.create(this._endpointName, this._createOptions);

        //
        // listening to media flow states
        //
        this._endpoint.on('MediaFlowInStateChange', (event: any) => {
            console.log(`[FLOW-IN/WebRtc]: ${event.state}`);

            // TODO: emit events
        });

        this._endpoint.on('MediaFlowOutStateChange', (event: any) => {
            console.log(`[FLOW-OUT/WebRtc]: ${event.state}`);
        });
    }

    /**
     * Connects this endpoint with `sink`
     *
     * @param {EndpointWrapper} endpoint
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public connect(sink: EndpointWrapper): Promise<void> {
        return this._endpoint.connect(sink._endpoint);
    }

    /**
     * Disconnects this endpoint with `sink`.
     *
     * @param {EndpointWrapper} sink
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public async disconnect(sink: EndpointWrapper): Promise<void>{
        return this._endpoint.disconnect(sink);
    }

    /**
     * Destroys all of resources taken by this endpoint.
     *
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public async close(): Promise<void> {
        return this._endpoint.release();
    }
}