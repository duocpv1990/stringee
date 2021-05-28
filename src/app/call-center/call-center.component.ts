import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

declare var StringeeSoftPhone: any;

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.scss']
})
export class CallCenterComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change', changes);

  }

  ngOnInit(): void {
    this.callConfig();
  }

  callConfig() {
    let config = {
      showMode: 'full',
      top: 90,
      left: 100,
      arrowLeft: 155,
      arrowDisplay: 'none',
      fromNumbers: [{ alias: 'Siam', number: '+84947774666' }],
    };
    StringeeSoftPhone.init(config);

    let string_token = 'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS29OdXllTlB3ak13TVFvNGdIaHhjaUpEU055MU9jMXdSLTE2MjIxOTUwNTQiLCJpc3MiOiJTS29OdXllTlB3ak13TVFvNGdIaHhjaUpEU055MU9jMXdSIiwiZXhwIjoxNjI0Nzg3MDU0LCJ1c2VySWQiOiIxMjMiLCJpY2NfYXBpIjp0cnVlfQ.IeqXQsANdAf7oL1hGkIeRoAVvCQkts73g6fTeJa0iTs';

    StringeeSoftPhone.on('requestNewToken', function () {
      console.log('requestNewToken+++++++');
      StringeeSoftPhone.connect(string_token);
    });

    StringeeSoftPhone.on('authen', function (res) {
      console.log('authen: ', res);
      if (res.r === 0 && window.opener.popupMustMakeOutgoingCall) {
        //make call
        StringeeSoftPhone.makeCall(
          window.opener.popupMustMakeOutgoingCallFrom,
          window.opener.popupMustMakeOutgoingCallTo,
          function (res) {
            console.log('res: ', res);
          },
          window.opener.popupMustMakeOutgoingCallType
        );

        window.opener.popupMustMakeOutgoingCall = false;
      }
    });

    StringeeSoftPhone.on('incomingCall', function (incomingcall) {
      if (window.opener.popupMustAnswerIncomingCall) {
        StringeeSoftPhone.answerCall();
      }
      window.opener.popupMustAnswerIncomingCall = false;
    });

    StringeeSoftPhone.connect(string_token);

  }

}
