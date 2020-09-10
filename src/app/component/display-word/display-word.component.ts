import {Component, Input, OnInit} from '@angular/core';
import * as d3 from "d3"

@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: ['./display-word.component.scss']
})
export class DisplayWordComponent implements OnInit {
  private _word: string;
  private guesses: string[] = [];

  constructor() { }

  @Input() set word(value: string) {
    this._word = value;
    this.restart();
  }

  @Input() set guess(value: string) {
    this.guesses.push(value[0]);
    this.setWord();
  }
  ngOnInit(): void {
  }

  private restart() {
    this.guesses = [];
    this.setWord();
  }

  private setWord() {

  }
}
