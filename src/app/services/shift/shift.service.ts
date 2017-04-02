import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShiftService {
  private baseUri = 'https://shift.ramirez-portfolio.com/api';
  constructor(private _http: Http) { }

  /**
   * Twitter get streams list
   * @returns {Observable<R>}
   */
  public getTwitterStreams(): Observable<Response> {
    return this._http.get(this.baseUri + '/twitter/listen')
      .map((response) => this.extractData(response))
      .catch((error) => this.handleError(error));
  }

  /**
   * Twitter request a listener to string
   * @param data
   * @returns {Observable<R>}
   */
  public postTwitterStreams(data): Observable<Response> {
    return this._http.post(this.baseUri + '/twitter/listen', data)
      .map((response) => this.extractData(response))
      .catch((error) => this.handleError(error));
  }





  /**
   * Twitter delete stream, need to pass id
   * @returns {Observable<R>}
   */
  public deleteTwitterStreams(id: string): Observable<Response> {
    console.log(id);
    let options: RequestOptionsArgs = new RequestOptions();
    options.body = {id: id};

    return this._http.delete(this.baseUri + '/twitter/listen', options)
      .map((response) => this.extractData(response))
      .catch((error) => this.handleError(error));
  }

  /**
   * Slack get Listener status
   * @returns {Observable<R>}
   */
  public getSlackListener() {
    return this._http.get(this.baseUri + '/slack/listen')
      .map((response) => this.extractData(response))
      .catch((error) => this.handleError(error));
  }

  /**
   * Slack toggle listener
   * @returns {Observable<R>}
   */
  public postSlackListener() {
    return this._http.post(this.baseUri + '/slack/listen', {})
      .map((response) => this.extractData(response))
      .catch((error) => this.handleError(error));
  }

  /**
   * Error Handler for http
   * @param error
   * @returns {any}
   */
  protected handleError (error: Response | any) {
    console.log(error);
    let errMsg: any;
    if (error instanceof Response) {
      errMsg = error.json();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  /**
   * Success Handler for http
   * @param res
   * @returns {any|{}}
   */
  protected extractData(res: Response): any {
    console.log(res);
    const body = res.json();
    return body || {};
  }
}
