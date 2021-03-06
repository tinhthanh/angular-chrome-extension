import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectFirebaseComponent } from './pages/connect-firebase/connect-firebase.component';
import { HighlightPageComponent } from './pages/highlight-page/highlight-page.component';
import { ManagerCookiesComponent } from './pages/manager-cookies/manager-cookies.component';
import { ViewCodeComponent } from './pages/view-code/view-code.component';

const routes: Routes = [{
  path: '',
  component: HighlightPageComponent
}, 
{
  path: 'connect-firebase',
  component: ConnectFirebaseComponent
},
{
  path: 'manager-cookies',
  component: ManagerCookiesComponent
},
{
  path: 'view-code',
  component: ViewCodeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeepTemplateRoutingModule { }
