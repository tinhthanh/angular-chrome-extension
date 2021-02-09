import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Entity, FirestoreCrudService } from '../firestore-crud.service';

@Injectable()
export class MDomainService {

  private crudService: FirestoreCrudService<MDomain>;

  // AngularFirestore should be found by Angular DI System
  constructor(private afs: AngularFirestore) {
      // Let's create our CrusService and use the a Collection with the name 'todos'
      this.crudService = new FirestoreCrudService<MDomain>(afs, 'MDomains');
  }

  add(data: MDomain, id?: string) {
      return this.crudService.add(data, id);
  }

  update(data: MDomain) {
      return this.crudService.update(data);
  }

  delete(data: MDomain) {
      return this.crudService.delete(data.id);
  }

  getAll() {
      return this.crudService.list();
  }
  getListByCondition(query: (ref: any) => any): Observable<MDomain[]> {
    return this.crudService.listByCondition(query); 
   }
}


 export class MDomain implements Entity {
  domain: string;
  actionType: string;
  lastUpdateTime: Date;
  id?: string;
}
