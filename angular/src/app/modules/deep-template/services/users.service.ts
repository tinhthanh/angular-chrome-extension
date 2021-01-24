import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Entity, FirestoreCrudService } from './firestore-crud.service';

@Injectable()
export class UsersService {

  private crudService: FirestoreCrudService<UserOriginal>;

  // AngularFirestore should be found by Angular DI System
  constructor(private afs: AngularFirestore) {
      // Let's create our CrusService and use the a Collection with the name 'todos'
      this.crudService = new FirestoreCrudService<UserOriginal>(afs, 'users');
  }

  addUser(user: UserOriginal) {
      return this.crudService.add(user);
  }

  updateUser(user: UserOriginal) {
      return this.crudService.update(user);
  }

  deleteUser(user: UserOriginal) {
      return this.crudService.delete(user.id);
  }

  getAllUsers(): Observable<UserOriginal[]> {
      return this.crudService.list();
  }
}
export class UserOriginal implements Entity {
    id?: string;
    userName: string;
    userID: string;
    lastUpdate: Date
}