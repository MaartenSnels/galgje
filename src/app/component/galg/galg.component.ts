import {Component, OnDestroy, OnInit} from '@angular/core';
import {RandomWordService} from "../../service/random-word.service";
import {fromEvent, Observable, Subscription} from "rxjs";


export interface character {
  letter: string;
  solved: boolean;
  display: string;
}

@Component({
  selector: 'app-word',
  templateUrl: './galg.component.html',
  styleUrls: ['./galg.component.scss']
})
export class GalgComponent implements OnInit, OnDestroy {

  constructor(private randomWordService : RandomWordService) {
  }

  word: string;
  clear: boolean = false;
  errorLevel: number = 0;
  oneLetter: boolean = true;
  youWon: boolean = false;
  youLost: boolean = false;
  started: boolean = false;
  private subscriptions: Array<Subscription> = [];
  private characters: Array<character> = []

  ngOnInit(): void {
    this.nextWordFromInternet();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  nextWordFromInternet(): void {
    this.nextWord(true);
  }
  nextRandomWordFromList(): void {
    this.nextWord(false);
  }

  nextWord(internet: boolean): void {
    this.subscriptions.push(this.randomWordService.nextWord(internet).subscribe(next => this.setWord(next)));
  }

  private setWord(word: string) {
    this.word = word;
    this.clear = false;
    this.youWon = false;
    this.youLost = false;
    this.started = false;
    this.errorLevel = 0;
    setTimeout(() => this.clear=true, 200);
    this.characters = [];
    if (!this.word) {
      return;
    }
    for(let i = 0; i < this.word.length; i++) {
      this.characters.push({letter: this.word[i], solved: false, display: '-'});
    }
  }



  handleButtonClicked(event: string) {
    if (!event) {
      return;
    }
    const item = event[0];
    if (!item) {
      return;
    }
    this.started = true;
    this.solve(item);
  }

  private solve(guess: string) {
    const found: Array<character> = this.characters.filter(d => !d.solved && d.letter == guess);
    if (!found || found.length == 0) {
      this.fail();
      return
    }
    if (this.oneLetter) {
      found[0].solved = true;
      found[0].display = found[0].letter
    } else {
      found.forEach(c => {
        c.solved = true;
        c.display = c.letter;
      })
    }
    this.checkSolved();
  }


  fail(): void {
    this.errorLevel++;
    if (this.errorLevel > 6) {
      this.youLost = true;
      this.characters.forEach(c => c.display = c.letter);
    }
  }

  private checkSolved() {
    const found : Array<character> = this.characters.filter(d => !d.solved);
    this.youWon = (!found || found.length == 0);
  }

  handleSelectedChange(event: Array<string>) {
    console.log('selection', event);
  }

  handleErrorLevelChange(event: number) {
    this.errorLevel = event;
  }

}
