import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Entity, FirestoreCrudService } from '../firestore-crud.service';

@Injectable()
export class MScriptService {

  private crudService: FirestoreCrudService<MScript>;

  // AngularFirestore should be found by Angular DI System
  constructor(private afs: AngularFirestore) {
      // Let's create our CrusService and use the a Collection with the name 'todos'
      this.crudService = new FirestoreCrudService<MScript>(afs, 'MScript');
  }

  add(data: MScript, id?: string) {
      return this.crudService.add(data, id);
  }

  update(data: MScript) {
      return this.crudService.update(data);
  }

  delete(data: MScript) {
      return this.crudService.delete(data.id);
  }

  getAll() {
      return this.crudService.list();
  }
  getListByCondition(query: (ref: any) => any): Observable<MScript[]> {
    return this.crudService.listByCondition(query); 
   }
}


 export class MScript implements Entity {
  domain: string;
  actionType: string;
  lastUpdateTime: Date;
  id?: string;
  code: string;
}