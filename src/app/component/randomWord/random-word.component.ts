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

  ngOnInit(): void {
    this.nextWordFromInternet();
  }

  nextWordFromInternet(): void {
    this.randomWordService.getWordFromInternet().subscribe(w => this.word = w);
  }


  nextRandomWordFromList(): void {
    this.word = this.randomWordService.nextRandomWordFromList();
  }

  handleButtonClicked(event: string) {
    console.log('button clicked:', event);
  }

  handleSelectedChange(event: Array<string>) {
    console.log('selection', event);
  }
}
