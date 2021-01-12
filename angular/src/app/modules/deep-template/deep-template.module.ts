import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeepTemplateRoutingModule } from './deep-template-routing.module';
import { HighlightDirective } from './directives/highlight.directive';
import { HighlightPageComponent } from './pages/highlight-page/highlight-page.component';


@NgModule({
  declarations: [
    HighlightDirective,
    HighlightPageComponent
  ],
  imports: [
    CommonModule,
    DeepTemplateRoutingModule
  ]
})
export class DeepTemplateModule { }
