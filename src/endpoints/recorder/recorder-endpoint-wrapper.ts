import { EndpointWrapper } from '../../abstract/endpoint/endpoint-wrapper';
import { RecorderEndpointCreateOptions } from './recorder-create-options';
import { IRecorderEndpointWrapper } from "../recorder/recorder-endpoint.interface";

/**
 * Sink endpoint that records a received stream.
 *
 * @class RecorderEndpointWrapper
 * @extends {EndpointWrapper}
 */
export class RecorderEndpointWrapper extends EndpointWrapper implements IRecorderEndpointWrapper {
    constructor(pipeline: any, createOptions: RecorderEndpointCreateOptions) {
        super(pipeline, createOptions);

        this._endpointName = "RecorderEndpoint";
    }

    public async init() {
        await super.init();

        this._endpoint.on('Recording', (event: any) => {
            this.emit('RecordingStopped', event);
        });

        this._endpoint.on('Stopped', (event: any) => {
            this.emit('RecordingStopped', event);
        });
    }

    public record(): Promise<void> {
        return this._endpoint.record();
    }

    public stopRecord() {
        return this._endpoint.stopAndWait();
    }
}