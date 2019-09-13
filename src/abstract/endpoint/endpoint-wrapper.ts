import { EventEmitter } from 'events';
import { IEndpointWrapper } from './endpoint-wrapper.interface';

/**
 * Represents the base instance of all of Kurento's endpoints.
 *
 * @export
 * @abstract
 * @class EndpointWrapper
 * @extends {EventEmitter}
 */
export abstract class EndpointWrapper extends EventEmitter implements IEndpointWrapper {
    protected _pipeline: any;
    protected _endpoint: any;
    protected _endpointName: string;
    protected _createOptions: any;

    public get endpoint(): any {
        return this._endpoint;
    }

    public get pipeline(): any{
        return this._pipeline;
    }

    public get endpointName(): string{
        return this._endpointName;
    }

    public get createOptions(): any{
        return this._createOptions;
    }

    constructor(pipeline: any, createOptions = {}) {
        super();

        this._endpointName = "";
        this._pipeline = pipeline;
        this._endpoint = null;
        this._createOptions = createOptions;
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
            if(event.state === "FLOWING"){
                this.emit("MediaFlowingIn", event);
            }
            else{
                this.emit("MediaStoppedFlowingIn", event);
            }
        });

        this._endpoint.on('MediaFlowOutStateChange', (event: any) => {
            if(event.state === "FLOWING"){
                this.emit("MediaFlowingOut", event);
            }
            else{
                this.emit("MediaStoppedFlowingOut", event);
            }
        });
    }

    /**
     * Connects this endpoint with `sink`
     *
     * @param {EndpointWrapper} endpoint
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public connect(sink: IEndpointWrapper): Promise<void> {
        return this._endpoint.connect(sink.endpoint);
    }

    /**
     * Disconnects this endpoint from `sink`.
     *
     * @param {EndpointWrapper} sink
     * @returns {Promise<void>}
     * @memberof EndpointWrapper
     */
    public async disconnect(sink: IEndpointWrapper): Promise<void>{
        return this._endpoint.disconnect(sink.endpoint);
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