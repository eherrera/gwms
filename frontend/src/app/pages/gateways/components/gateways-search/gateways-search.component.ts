import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gateways-search',
  templateUrl: './gateways-search.component.html',
  styleUrls: ['./gateways-search.component.css'],
})
export class GatewaysSearchComponent implements OnInit {
  @Input() placeholder: string = 'Search';

  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSearch(query: string = '') {
    this.search.emit(query);
  }
}
