import {Component, OnDestroy} from '@angular/core';
import { ShiftService } from '../../services/shift/shift.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketIoService } from '../../services/socket/socket-io.service';
import {ISubscription} from "rxjs/Subscription";
@Component({
  selector: 'shift-twitter-controller',
  templateUrl: 'main-view.template.html',
  styleUrls: ['./main-view.css']
})
export class MainViewComponent implements OnDestroy {
  public form: FormGroup;
  public submissionInProgress: boolean = false;

  public twitterStreamsArray: Array<any> = [];

  public tweetsLastFive: Array<any> = [];
  private tweetsSubscriber: ISubscription;


  constructor(private _shift: ShiftService, private fb: FormBuilder, private _socket: SocketIoService) {
    console.log('constructor');
    this.createForm();
    this.getTwitterSteams();
    this.tweetsSubscriber = this._socket.getTweet().subscribe((response) => {
      console.log(response);
      if (this.tweetsLastFive.length >= 5) {
        this.tweetsLastFive.pop();
      }
      this.tweetsLastFive.unshift(response);
    }, (error) => {
      console.log(error);
    });
  }

  public ngOnDestroy() {
    console.log(' Destroy my susbcribers');
    this.tweetsSubscriber.unsubscribe();
  }




  public onSubmit({ value, valid }: { value: any, valid: boolean }) {
    console.log(value, valid);
    if ( !this.submissionInProgress && valid) {
      this.submissionInProgress = true;
      this._shift.postTwitterStreams(value).subscribe((response) => {
        console.log(response);
        this.twitterStreamsArray.push(response);
        this.reset();
        this.submissionInProgress = false;
      }, (err) => {
        console.log(err);
        this.submissionInProgress = false;
      });
    }
  }
  private createForm() {
    console.log('createForm');
    this.form = this.fb.group({
      term: ['', [Validators.required]]
    });
  }
  private reset() {
    console.log('reset form');
    this.form.reset({term: ''});
  }
  private getTwitterSteams(): void {
    // CALL API to get all streams
    this._shift.getTwitterStreams().subscribe((response) => {
      console.log(response);
      console.log(typeof response);

      this.twitterStreamsArray = [];
      if (response) {
        for (const x in response) {
          console.log(response[x]);
          this.twitterStreamsArray.push({id: response[x].id, term: response[x].term});
        }
      }
      // this.twitterStreamsArray = response;
    }, (err) => {
      console.log(err);
    });


  }
  private stopTwitterStream(twitterStreamObj): void {
    console.log(twitterStreamObj);
    this._shift.deleteTwitterStreams(twitterStreamObj.id).subscribe((response) => {
      console.log(response);
      this.getTwitterSteams();
    }, (err) => {
      console.log(err);
    });
    // CALL API to stop stream

  }

}
