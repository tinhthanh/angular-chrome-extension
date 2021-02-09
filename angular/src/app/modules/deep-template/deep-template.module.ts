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
import {  ViewCodeComponent } from './pages/view-code/view-code.component';

import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { MDomainService } from './services/manager-script/m-domain.service';
import { MScriptService } from './services/manager-script/m-script.service';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(en);
@NgModule({
  declarations: [
    HighlightDirective,
    HighlightPageComponent,
    DynamicTableComponent,
    ConnectFirebaseComponent,
    ManagerCookiesComponent,
    ViewCodeComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    DeepTemplateRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MonacoEditorModule,
    NgZorroAntdModule
  ],
  providers: [ MDomainService,MScriptService ,CookiesService, UsersService, { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }]
})
export class DeepTemplateModule { }
