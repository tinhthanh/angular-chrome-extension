import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baostar',
  templateUrl: './baostar.component.html',
  styleUrls: ['./baostar.component.scss']
})
export class BaostarComponent implements OnInit {

  isLoading  = true;
  constructor() { }

  ngOnInit(): void {
  }
  onMyFrameLoad() {
    this.isLoading = false;
  }

}
