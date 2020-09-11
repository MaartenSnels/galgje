import { Component, OnInit } from '@angular/core';
import {RandomWordService} from "../../service/random-word.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.scss']
})
export class RandomWordComponent implements OnInit {

  constructor(private randomWordService : RandomWordService) {
  }

  word: string;
  clear: boolean = false;
  errorLevel: number = 0;
  oneLetter: boolean = true;
  youWon: boolean = false;
  youLost: boolean = false;
  started: boolean = false;
  lostHeader: string;
  private guess: string = '';

  ngOnInit(): void {
    this.nextWordFromInternet();
  }

  nextWordFromInternet(): void {
    this.nextWord(true);
  }
  nextRandomWordFromList(): void {
    this.nextWord(false);
  }

  nextWord(internet: boolean): void {
    this.clear = false;
    this.youWon = false;
    this.youLost = false;
    this.started = false;
    setTimeout(() => this.clear=true, 200);
    if (internet) {
      this.randomWordService.getWordFromInternet().subscribe(w => this.word = w);
    } else {
      this.word = this.randomWordService.nextRandomWordFromList();
    }
    this.guess = '';
  }



  handleButtonClicked(event: string) {
    this.started = true;
    this.guess = event;
    setTimeout(() => this.guess='', 200);
  }

  handleSelectedChange(event: Array<string>) {
    console.log('selection', event);
  }

  handleErrorLevelChange(event: number) {
    this.errorLevel = event;
  }

  setWin(value: boolean) {
    this.youWon = value;
    this.youLost = !value;
  }
}
