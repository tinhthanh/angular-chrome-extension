import { Component, Inject } from '@angular/core';
import { TAB_ID } from '../../../../providers/tab-id.provider';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})
export class OptionsComponent {
  message: any[];
  constructor(@Inject(TAB_ID) readonly tabId: number) {}
  async onClick(): Promise<void> {
    console.log("dmeo")
    this.message = await bindCallback<any[]>(chrome.cookies.getAll.bind(this, {}))()
      .pipe(
        map(msg =>
           {
              console.log((msg as []).filter( (k: any) => k.domain === '.facebook.com' ))
             return msg ;
           }
        )
      )
      .toPromise();
  }
  getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    const randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}
  addCookies() {
    [
      {
        domain: '.facebook.com',
        expirationDate: 1672942551.268056,
        hostOnly: false,
        httpOnly: true,
        name: 'datr',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: '1az0Xyp6NVg4eX9KXfYhhGDo'
      },
      {
        domain: '.facebook.com',
        expirationDate: 1672942570.955196,
        hostOnly: false,
        httpOnly: true,
        name: 'sb',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: '56z0X7QgwySol_mQrpe4li0b'
      },
      {
        domain: '.facebook.com',
        expirationDate: 1610475368,
        hostOnly: false,
        httpOnly: false,
        name: 'wd',
        path: '/',
        sameSite: 'lax',
        secure: true,
        session: false,
        storeId: '0',
        value: '427x757'
      },
      {
        domain: '.facebook.com',
        expirationDate: 1641406568.955329,
        hostOnly: false,
        httpOnly: false,
        name: 'c_user',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: '100005036221206'
      },
      {
        domain: '.facebook.com',
        expirationDate: 1641406568.955413,
        hostOnly: false,
        httpOnly: true,
        name: 'xs',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: '16%3AvywwFgVa2DcF6Q%3A2%3A1608728229%3A2820%3A6911%3A%3AAcXRhN16adgOwk8X4M-ehAe_IxpWKGXd0hVSZlAK4jGM'
      },
      {
        domain: '.facebook.com',
        expirationDate: 1617646566.95548,
        hostOnly: false,
        httpOnly: true,
        name: 'fr',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: '16F94TYUYsNkxKl2n.AWXUu1sSve6CxnBWnGAlCYAF658.Bf9Kzn.rI.AAA.0.0.Bf9Kzp.AWWs9_nfunI'
      },
      {
        domain: 'zpw_sek',
        expirationDate: 1609960573.457867,
        hostOnly: false,
        httpOnly: true,
        name: 'spin',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: 'Z1GT.213563867.a0.wyB91l4ch70gdnPyq2QiS8e4oHlJ78v7l5BlIPDGcaQvGDr8ed_f0iP9r2Qm6v5IZ2UQYaLJa-kq9wseyaQ9_m'
      }
    ].map( (k) => {  return new CookieImport(k,"https://www.facebook.com");}).forEach( (z : any) => {
      chrome.cookies.set( z  , (e) => {
        console.log(e);
      })
    });

  }
}
export interface CookieOriginal {
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  session: boolean;
  storeId: string;
  value: string;
}
export class CookieImport {
  domain: string;
  expirationDate: number;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  storeId: string;
  value: string;
  url: string;
  constructor(original: CookieOriginal, url : string) {
    this.domain =  original.domain;
    this.expirationDate =  original.expirationDate;
    this.httpOnly =  original.hostOnly;
    this.name =  original.name;
    this.path =  original.path
    this.secure =  original.secure;
    this.storeId=  original.storeId;
    this.value=  original.value;
    this.url = url;  
  }
}

// {domain:".googleeeeeeeeee.com",expirationDate:1622604960.393678, httpOnly:true,name":"CGIC",path:"",sameSite:"unspecified",secure:false,session:false,storeId:"0",value:"EhQxQzFHQ0VVX2VuVk44NTdWTjg1NyKHAXRleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL2F2aWYsaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuO
// CxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuOQ"}


