import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from "util";

interface character {
  letter: string;
  solved: boolean;
  position: number;
}

@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: ['./display-word.component.scss']
})
export class DisplayWordComponent implements OnInit {
  private _word: string;
  private guesses: string[] = [];
  display: Array<character>;
  private errorLevel: number;

  constructor() { }


  @Output() errorLevelChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() set word(value: string) {
    this._word = value;
    this.restart();
  }

  @Input() set guess(value: string) {

    const item = value[0];
    this.guesses.push(item);
    this.solve(item);
  }
  ngOnInit(): void {
  }

  private restart() {
    this.guesses = [];
    this.setWord();
    this.errorLevel = 0;
    this.errorLevelChange.emit(this.errorLevel);
  }

  private setWord() {
    this.display = [];
    if (!this._word) {
      return;
    }
    for(let i = 0; i < this._word.length; i++) {
      this.display.push({letter: this._word[i], position: i, solved: false});
    }
  }

  private solve(guess: string) {
    const found: Array<character> = this.display.filter(d => !d.solved && d.letter == guess);
    if (!found || found.length == 0) {
      this.fail();
      return
    }
    found.forEach(c => c.solved = true)
  }

  fail(): void {
    this.errorLevel++;
    this.errorLevelChange.emit(this.errorLevel);
  }

  getClass(char: character) {
    return char.solved ? 'solved' : '';
  }
  getChar(char: character) {
    return char.solved ? char.letter : '-';
  }
}
