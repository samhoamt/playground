import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'sc-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  @ViewChild('card') card!: ElementRef;
  @ViewChild('a1') a1!: ElementRef;
  @ViewChild('a2') a2!: ElementRef;
  @ViewChild('b1') b1!: ElementRef;
  @ViewChild('b2') b2!: ElementRef;

  @Input()
  chars: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', ' '];
  
  @Input()
  speed: number = 0.15;

  @Input()
  size: number = 50;

  @Input()
  char:string = '';

  charIndex = -1;

  ngAfterViewInit(){
    this.card.nativeElement.style.width = this.size + 'px';
    this.card.nativeElement.style.height = this.size + 'px';
    this.card.nativeElement.style.lineHeight = this.size + 'px';
    this.card.nativeElement.style.fontSize = (this.size / 1.8) + 'px';

    setInterval(() => {
      if(this.b2.nativeElement.innerHTML == this.char.toUpperCase()){
        this.stop();
      }else{
        this.flapIt();
      }
    }, this.speed * 1000);
  }

  flapIt(){
    this.a2.nativeElement.style.animationDuration = this.speed + "s";
    this.b2.nativeElement.style.animationDuration = this.speed + "s";

    this.a1.nativeElement.style.visibility = 'visible';
    this.b2.nativeElement.style.visibility = 'visible';

    this.a1.nativeElement.innerHTML = this.chars[this.charIndex] || '';
    this.a2.nativeElement.innerHTML = this.chars[this.charIndex] || '';
    this.charIndex = this.charIndex < this.chars.length - 1 ? this.charIndex + 1 : 0;
    this.b1.nativeElement.innerHTML = this.chars[this.charIndex];
    this.b2.nativeElement.innerHTML = this.chars[this.charIndex];

    this.a2.nativeElement.classList.remove('flip1');
    this.a2.nativeElement.style.width = this.a2.nativeElement.offsetWidth + 'px';
    this.a2.nativeElement.classList.add('flip1');

    this.b2.nativeElement.classList.remove('flip2');
    this.b2.nativeElement.style.width = this.b2.nativeElement.offsetWidth + 'px';
    this.b2.nativeElement.classList.add('flip2');
  }

  stop(){
    this.a1.nativeElement.innerHTML = this.chars[this.charIndex] || '';
    this.a2.nativeElement.innerHTML = this.chars[this.charIndex] || '';
    this.a1.nativeElement.style.visibility = 'hidden';
    this.b2.nativeElement.style.visibility = 'hidden';
  }
}
