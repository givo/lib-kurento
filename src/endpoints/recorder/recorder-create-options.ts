import { MediaProfile } from './media-profile.enum';

export interface RecorderEndpointCreateOptions{
    uri: string;
    mediaProfile: MediaProfile;
}