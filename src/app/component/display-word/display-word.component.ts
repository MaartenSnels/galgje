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
  display: Array<character>;
  private errorLevel: number;
  private lost: boolean = false;

  constructor() { }


  @Output() errorLevelChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() youWon: EventEmitter<void> = new EventEmitter();
  @Output() youLost: EventEmitter<void> = new EventEmitter();

  @Input() set word(value: string) {
    this._word = value;
    this.restart();
  }
  @Input() oneLetter:boolean = false;

  @Input() set guess(value: string) {
    if (!value) {
      return;
    }
    const item = value[0];
    if (!item) {
      return;
    }
    this.solve(item);
  }
  ngOnInit(): void {
  }

  private restart() {
    this.setWord();
    this.errorLevel = 0;
    this.errorLevelChange.emit(this.errorLevel);
  }

  private setWord() {
    this.lost = false;
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
    if (this.oneLetter) {
      found[0].solved = true;
    } else {
      found.forEach(c => c.solved = true)
    }
    this.checkSolved();
  }

  fail(): void {
    this.errorLevel++;
    this.errorLevelChange.emit(this.errorLevel);
    if (this.errorLevel > 6) {
      this.youLost.emit();
      this.lost = true;
    } else {
      this.lost = false;
    }
  }

  getClass(char: character) {
    return char.solved ? 'solved' : '';
  }
  getChar(char: character) {
    return char.solved || this.lost ? char.letter : '-';
  }

  private checkSolved() {
    const found : Array<character> = this.display.filter(d => !d.solved);
    if (!found || found.length == 0) {
      this.youWon.emit();
    }
  }
}
