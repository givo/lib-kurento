export class PlayerEndpointCreateOptions{
    public static readonly DEFAULT_NETWORK_CACHE = 500;

    public uri: string;
    public networkCache: Number;

    constructor(uri: string, networkCache = PlayerEndpointCreateOptions.DEFAULT_NETWORK_CACHE){
        this.uri = uri;
        this.networkCache = networkCache;
    }
}