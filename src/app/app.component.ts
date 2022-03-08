import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
