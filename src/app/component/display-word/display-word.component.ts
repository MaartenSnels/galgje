import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {character} from "../galg/galg.component";


@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: ['./display-word.component.scss']
})

export class DisplayWordComponent implements OnInit {

  constructor() { }


  @Output() errorLevelChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() youLost: boolean = false;
  @Input() characters: Array<character>;

  ngOnInit(): void {
  }

  getClass(char: character) {
    return char.solved ? 'solved' : '';
  }

 }
