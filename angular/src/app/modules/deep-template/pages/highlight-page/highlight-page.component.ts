import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight-page',
  templateUrl: './highlight-page.component.html',
  styleUrls: ['./highlight-page.component.scss']
})
export class HighlightPageComponent implements OnInit {
  data: CookieImport[] = [] ; 
  propsArray: TablePropsArray = Object.keys(new CookieImport()) as TablePropsArray;
  constructor() { 
    this.data = [
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
        domain: '.facebook.com',
        expirationDate: 1609960573.457867,
        hostOnly: false,
        httpOnly: true,
        name: 'spin',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: 'r.1003151454_b.trunk_t.1609870573_s.1_v.2_'
      }
    ].map( (k) => {  return new CookieImport(k,"https://www.facebook.com");});
     console.log(this.data);
  
     console.log(this.propsArray);
  }

  ngOnInit(): void {
    console.log(getInstance(CookieImport))

  }


}
export function getInstance<T extends Object>(type: (new (...args: any[]) => T), ...args: any[]): T {
  return new type(...args);
}
type TablePropsArray = Array<keyof CookieImport>;
 class CookieOriginal {
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
 class CookieImport {
  domain: string;
  expirationDate: number;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  storeId: string;
  value: string;
  url: string;
  constructor(original?: CookieOriginal, url? : string) {
    this.domain =  original?.domain ;
    this.expirationDate =  original?.expirationDate ;
    this.httpOnly =  original?.hostOnly ;
    this.name =  original?.name ;
    this.path =  original?.path ;
    this.secure =  original?.secure ;
    this.storeId=  original?.storeId ;
    this.value=  original?.value ;
    this.url = url  || '';
  }

}
