import * as kurento from 'kurento-client';

export function connectToKurentoServer(kurentoServerUri: string): Promise<any> {
    return kurento(kurentoServerUri);
}

/**
 * Fixes a bug in kurento-client library.
 *
 * @export
 * @param {*} kurentoClient
 * @returns
 */
export async function createPipeline(kurentoClient: any) {
    const pipeline = await kurentoClient.create('MediaPipeline');

    // **Very Important** - in order to allow kurento-client to create additional pipelines in the same application
    pipeline.__proto__ = kurento.register.classes.MediaPipeline.prototype;

    return pipeline;
}