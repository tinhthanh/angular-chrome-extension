import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeepTemplateRoutingModule } from './deep-template-routing.module';
import { HighlightDirective } from './directives/highlight.directive';
import { HighlightPageComponent } from './pages/highlight-page/highlight-page.component';
import { DynamicTableComponent } from './pages/highlight-page/components/dynamic-table/dynamic-table.component';
import {AngularFireModule }  from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFirestoreModule}  from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { ConnectFirebaseComponent } from './pages/connect-firebase/connect-firebase.component';
import { ManagerCookiesComponent } from './pages/manager-cookies/manager-cookies.component'
import { CookiesService } from './services/cookies.service';
import { UsersService } from './services/users.service';
@NgModule({
  declarations: [
    HighlightDirective,
    HighlightPageComponent,
    DynamicTableComponent,
    ConnectFirebaseComponent,
    ManagerCookiesComponent,
  ],
  imports: [
    CommonModule,
    DeepTemplateRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [ CookiesService, UsersService]
})
export class DeepTemplateModule { }
