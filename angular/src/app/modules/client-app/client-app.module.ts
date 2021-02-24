import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientAppRoutingModule } from './client-app-routing.module';
import { MainBoardComponent } from './pages/main-board/main-board.component';


@NgModule({
  declarations: [MainBoardComponent],
  imports: [
    CommonModule,
    ClientAppRoutingModule
  ]
})
export class ClientAppModule { }
