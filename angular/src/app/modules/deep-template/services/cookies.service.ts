import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreCrudService } from './firestore-crud.service';
import { Entity }  from './firestore-crud.service'
@Injectable()
export class CookiesService {


  private crudService: FirestoreCrudService<CookieImport>;

  // AngularFirestore should be found by Angular DI System
  constructor(private afs: AngularFirestore) {
      // Let's create our CrusService and use the a Collection with the name 'todos'
      this.crudService = new FirestoreCrudService<CookieImport>(afs, 'cookies');
  }

  addCookie(cookie: CookieImport) {
      return this.crudService.add(cookie);
  }

  updateCookie(cookie: CookieImport) {
      return this.crudService.update(cookie);
  }

  deleteCookie(cookie: CookieImport) {
      return this.crudService.delete(cookie.id);
  }

  getAllCookies() {
      return this.crudService.list();
  }
  getListByCondition(query: (ref: any) => any): Observable<CookieImport[]> {
    return this.crudService.listByCondition(query); 
   }
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
 class CookieImport implements Entity  {
  domain: string;
  expirationDate: number;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  storeId: string;
  value: string;
  url: string;
  id?: string;
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
