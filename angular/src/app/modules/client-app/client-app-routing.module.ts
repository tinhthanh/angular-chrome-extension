import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaostarComponent } from './pages/baostar/baostar.component';
import { MainBoardComponent } from './pages/main-board/main-board.component';

const routes: Routes = [
  {
    path: 'standard',
    component: MainBoardComponent
  }, {
    path: 'turbo',
    component: BaostarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAppRoutingModule { }
