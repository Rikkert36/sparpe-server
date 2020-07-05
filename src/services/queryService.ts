import SpotifyWebApi from 'spotify-web-api-node';
import { ArtistID } from '../models/types';

let spotifyApi: SpotifyWebApi;
let refreshTime: number = 0;
const limit: number = 10;

export class QueryService {
  private async updateAPI() {
    if (!spotifyApi) {
      spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      });
    }
    if ((new Date().getTime() - refreshTime) > 3500000) {
      await spotifyApi.clientCredentialsGrant()
        .then((data) => {
          console.log(`The access token expires in ${data.body.expires_in}`);
          console.log(`The access token is ${data.body.access_token}`);

          // Save the access token so that it's used in future calls
          refreshTime = new Date().getTime();
          spotifyApi.setAccessToken(data.body.access_token);
          console.log('refresh token');
        }, (err) => {
          console.log('Something went wrong when retrieving an access token', err.message);
        });
    }
  }

  public async getElvisAlbums() {
    await this.updateAPI();
    return spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      (data) => {
        console.log('Artist albums', data.body);
      },
      (err) => {
        console.error(err);
      },
    );
  }

  public async searchDavid(): Promise<ArtistID[]> {
    await this.updateAPI();
    return spotifyApi.searchArtists('David Bowie', { limit: 10, offset: 0 }).then(
      (data) => {
        return data.body.artists!.items.map((artist) => {
          const pair: ArtistID = {
            id: artist.id,
            name: artist.name,
          };
          return pair;
        });
      },
    );
  }

  public async searchArtist(searchString: string): Promise<ArtistID[]> {
    await this.updateAPI();
    return spotifyApi.searchArtists(searchString, { limit }).then(
      (data) => {
        console.log(data);
        return data.body.artists!.items.map((artist) => {
          const pair: ArtistID = {
            id: artist.id,
            name: artist.name,
          };
          return pair;
        });
      },
    );
  }
}
