import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface key {
  letter: string;
  clickCount: number;
}

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})

export class KeyboardComponent implements OnInit {

  keysList:Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  keys: Array<key> = [];

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Input() set clear(value: boolean) {
    if (value) {
      this.keys.forEach(k => k.clickCount = 0);
      this.selectedChange.emit([])
    }
  }
  @Input() oneLetter: boolean = false;
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.keysList.forEach(k => this.keys.push({clickCount: 0, letter: k}));
  }

  keyClicked(pressed: key) {
    pressed.clickCount++;
    this.buttonClicked.emit(pressed.letter);
    const selected: Array<string> = this.keys.filter(key => key.clickCount > 0).map(key => key.letter);
    this.selectedChange.emit(selected);
  }

  getLetter(key: key): string {

    if (key.clickCount == 0 || !this.oneLetter) {
      return key.letter;
    }
    return `${key.letter} (${key.clickCount})`;

  }

  getClass(key: key): string {
    return `key${key.clickCount > 0 && !this.oneLetter ? ' clicked' : ''}`;
  }

  canClick(key: key): boolean {
    if (this.disabled) {
      return false;
    }
    return this.oneLetter || key.clickCount == 0
  }
}
