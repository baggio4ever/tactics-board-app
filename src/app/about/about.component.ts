import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title = 'tactics-board-app';

  constructor() { }

  ngOnInit() {
  }

  getAngularVersion(): string {
    return VERSION.full;
  }
}
