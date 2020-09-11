import { Component, OnInit } from '@angular/core';
import {RandomWordService} from "../../service/random-word.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.scss']
})
export class RandomWordComponent implements OnInit {
  private guess: string = '';

  constructor(private randomWordService : RandomWordService) {
  }

  word: string;
  clear: boolean = false;
  errorLevel: number = 0;

  ngOnInit(): void {
    this.nextWordFromInternet();
  }

  nextWordFromInternet(): void {
    this.clear = false;
    setTimeout(() => this.clear=true, 200);
    this.randomWordService.getWordFromInternet().subscribe(w => this.word = w);
    this.guess = '';
  }


  nextRandomWordFromList(): void {
    this.clear = false;
    setTimeout(() => this.clear=true, 200);
    this.word = this.randomWordService.nextRandomWordFromList();
    this.guess = '';
  }

  handleButtonClicked(event: string) {
    this.guess = event;
  }

  handleSelectedChange(event: Array<string>) {
    console.log('selection', event);
  }

  handleErrorLevelChange(event: number) {
    this.errorLevel = event;
  }
}
