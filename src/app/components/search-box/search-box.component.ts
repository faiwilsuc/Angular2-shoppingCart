import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Output() update = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.update.emit('');
  }

}
