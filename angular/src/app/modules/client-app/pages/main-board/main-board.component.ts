import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {
    isLoading  = true;
  constructor() { }

  ngOnInit(): void {
  }
  onMyFrameLoad() {
    this.isLoading = false;
  }

}
