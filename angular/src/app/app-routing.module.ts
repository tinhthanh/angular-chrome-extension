import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/1Xfa2t7kzAtCpAp9Sf1C', pathMatch: 'full' },
  {
    path: 'popup',
    pathMatch: 'full',
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule)
  },
  {
    path: 'tab',
    pathMatch: 'full',
    loadChildren: () => import('./modules/tab/tab.module').then(m => m.TabModule)
  },
  {
    path: 'options',
    pathMatch: 'full',
    loadChildren: () => import('./modules/options/options.module').then(m => m.OptionsModule)
  },
  {
    path: 'deep',
    loadChildren: () => import('./modules/deep-template/deep-template.module').then(m => m.DeepTemplateModule)
  }, {
    path: '1Xfa2t7kzAtCpAp9Sf1C',
    loadChildren: () => import('./modules/client-app/client-app.module').then(m => m.ClientAppModule)
  },

];  

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
