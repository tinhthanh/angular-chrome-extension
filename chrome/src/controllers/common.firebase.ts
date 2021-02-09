

import { environment } from '../../../angular/src/environments/environment'
import firebase from 'firebase/app';
import 'firebase/firestore';
firebase.initializeApp(environment.firebaseConfig);
export const  AngularFirestore = firebase.firestore();