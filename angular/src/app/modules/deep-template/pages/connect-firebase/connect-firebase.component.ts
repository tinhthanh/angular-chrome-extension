import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { zip } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-connect-firebase',
  templateUrl: './connect-firebase.component.html',
  styleUrls: ['./connect-firebase.component.sass']
})
export class ConnectFirebaseComponent implements OnInit {
  domainsActive = ['.facebook.com'];
  constructor(private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
  const data =  [
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
      }
    ];
    const og = convertCookieImport(data);
    updateCookie(og, this.angularFirestore);
  }

}
const convertCookieImport = (data: CookieOriginal[]) => {
  const mapActive = {
    ".facebook.com" : "https://www.facebook.com",
    ".chat.zalo.me" : "https://chat.zalo.me"
  }
  return data.filter( f => Object.keys(mapActive).includes(f.domain)).map( (k) => {  return new CookieImport(k,mapActive[k.domain]|| k.domain);});
}
const updateCookie = (data: CookieImport[], angularFirestore: AngularFirestore ) => {
  const TB_COOKIE = 'cookies';
  const TB_USER = 'users';
  data.filter( k => k.domain == '.facebook.com' && k.name == 'c_user').forEach( f1 => {
    const userID = f1.value;
    const collectionCookies = angularFirestore.collection(TB_COOKIE,  (ref) => ref.where( 'userID','==' ,userID ));
    collectionCookies.get().subscribe( async docs => {
      const currentDocs = [];
        docs.forEach(doc => currentDocs.push(collectionCookies.doc(doc.id).delete()));
          await Promise.all(currentDocs);
          data.forEach( cookie => {
            angularFirestore.collection(TB_COOKIE).add(Object.assign({userID: userID }, cookie));
         });
    });
    const collectionRef = angularFirestore.collection(TB_USER,  (ref) => ref.where( 'userID','==' , userID));
    collectionRef.get().subscribe( rs => {
     rs.size === 0 && angularFirestore.collection(TB_USER).add( { userID: userID, userName: "create" , lastUpdate: new Date()} );
     rs.forEach( update => {
           angularFirestore.collection(TB_USER).doc(update.id).update({ userID: userID, userName: "update" , lastUpdate: new Date()} );
        });
    });
  });
}

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