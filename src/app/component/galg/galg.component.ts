import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-galg',
  templateUrl: './galg.component.html',
  styleUrls: ['./galg.component.scss']
})
export class GalgComponent implements OnInit {

  images: Array<string> = [
    'assets/img/galgje_1.gif',
    'assets/img/galgje_2.gif',
    'assets/img/galgje_3.gif',
    'assets/img/galgje_4.gif',
    'assets/img/galgje_5.gif',
    'assets/img/galgje_6.gif',
    'assets/img/galgje_7.gif'
  ]
  gefiliciteerd: string = 'assets/img/gefiliciteerd.jpg';
  imageToShow: string;

  constructor() { }

  @Input() set youWon(value: boolean) {
    if (value) {
      this.imageToShow = this.gefiliciteerd;
    }
  }
  @Input() set error(value: number) {
    if (value <= 0) {
      this.imageToShow = '';
      return;
    }
    if (value > this.images.length) {
      value = this.images.length;
    }
    this.imageToShow = this.images[value - 1];
  }

  ngOnInit(): void {
  }

}
