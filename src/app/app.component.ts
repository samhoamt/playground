import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import SplitFlapModule from './modules/split-flap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SplitFlapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playground';

  name:string = 'Aung Myint Thein';

  index:number = 0;
  change() {
    this.index++;
  }
}
