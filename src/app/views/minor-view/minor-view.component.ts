import { Component } from '@angular/core';
import {ShiftService} from "../../services/shift/shift.service";

@Component({
    selector: 'minorView',
    templateUrl: 'minor-view.template.html'
})
export class minorViewComponent {

  public slackStatus: boolean = false;

  constructor(private _shift: ShiftService){
    this.getSlackListenerStatus();
  }

  public getStatus(){
    return this.slackStatus? 'OFF':'ON';
  }

  private getSlackListenerStatus() {
    this._shift.getSlackListener().subscribe((response) => {
      console.log(response);
      this.slackStatus = response.status;
    }, (error) => {
      console.log(error);
    });
  }


  private toggleSlackListener() {
    console.log('toggle has be clicked');
    this._shift.postSlackListener().subscribe((response) => {
      console.log(response);
      this.slackStatus = response.status;
    },(error) => {
      console.log(error);
    });
  }



}