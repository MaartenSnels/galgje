import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface key {
  letter: string;
  clicked: boolean;
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
      this.keys.forEach(k => k.clicked = false);
      this.selectedChange.emit([])
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.keysList.forEach(k => this.keys.push({clicked: false, letter: k}));
  }

  keyClicked(pressed: key) {
    pressed.clicked = true;
    this.buttonClicked.emit(pressed.letter);
    const selected: Array<string> = this.keys.filter(key => key.clicked).map(key => key.letter);
    this.selectedChange.emit(selected);
  }

  getClass(key: key) {
    return `key${key.clicked ? ' clicked' : ''}`
  }
}
