import { Injectable } from '@angular/core';
import { AjaxRequestData } from '../models/ajax-request-data.interface';
import { environment } from 'src/environments/environment';
declare const OAuth: any;

@Injectable()
export class FluigOauthService {
  public getOauthHeaders(requestData: AjaxRequestData) {

    const oauth = OAuth({
      consumer: {
        public: environment.OAUTH_CONSUMER_PUBLIC,
        secret: environment.OAUTH_CONSUMER_SECRET
      },
      signature_method: environment.OAUTH_SIGNATURE_METHOD
    });

    const token = {
      public: environment.TOKEN_PUBLIC,
      secret: environment.TOKEN_SECRET
    };

    return oauth.toHeader(oauth.authorize(requestData, token));
  }
}
