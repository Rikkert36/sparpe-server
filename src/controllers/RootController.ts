import express from 'express';
import {
  Body, Controller, Get, Post, Route, Delete, Request, Response, Put, Query, Security,
} from 'tsoa';
import { QueryService } from '../services/queryService';
import { ArtistID } from '../models/types';

@Route('')
export class RootController extends Controller {
  @Get('searchDavid')
  public async getBowieData(): Promise<ArtistID[]> {
    const result = new QueryService().searchDavid();
    console.log(result);
    return result;
  }

  @Get('getElvisAlbums')
  public async getElvisAlbums(): Promise<any> {
    const number = new QueryService().getElvisAlbums();
    return number;
  }

  @Get('searchArtist')
  public async searchArtist(
    @Query() searchString: string,
  ): Promise<ArtistID[]> {
    const number = new QueryService().searchArtist(searchString);
    return number;
  }

  @Get('networkTest')
  public networkTest() {
    return 1;
  }
}
