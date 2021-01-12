import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HighlightPageComponent } from './pages/highlight-page/highlight-page.component';

const routes: Routes = [{
  path: '',
  component: HighlightPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeepTemplateRoutingModule { }
