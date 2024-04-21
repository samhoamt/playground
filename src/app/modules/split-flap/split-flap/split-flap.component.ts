import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import CharacterComponent from '../character';

@Component({
  selector: 'sc-split-flap',
  standalone: true,
  imports: [CommonModule, CharacterComponent],
  templateUrl: './split-flap.component.html',
  styleUrl: './split-flap.component.scss'
})
export class SplitFlapComponent {
  @Input()
  value:string = '';

  @Input()
  charSize: number = 25;

  @Input()
  speed: number = 0.15; // seconds

  @Input()
  charSpace: number = 3; // px

}
