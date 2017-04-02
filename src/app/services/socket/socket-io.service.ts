import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
  private socket;
  private baseUri = 'http://shift.ramirez-portfolio.com:8082';
  constructor() {
      this.socket = io.connect(this.baseUri, {secure: true});
        // this.socket.disconnect();
  }



  getTweet() {
    let observable = new Observable(observer => {
      this.socket.on('tweet', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('disconect');
      };
    })
    return observable;
  }

}
