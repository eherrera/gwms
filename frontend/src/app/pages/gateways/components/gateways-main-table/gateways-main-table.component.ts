import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'gateways-main-table',
  templateUrl: './gateways-main-table.component.html',
  styleUrls: ['./gateways-main-table.component.css'],
})
export class GatewaysMainTableComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    columns: {
      serial_number: {
        title: 'Serial number',
        editable: false,
        filter: false,
      },
      name: {
        title: 'Name',
        editable: false,
        filter: false,
      },
      ipv4: {
        title: 'IPv4',
        editable: false,
        filter: false,
      },
      devices_count: {
        title: 'Devices Count',
        editable: false,
        filter: false,
      },
    },
  };

  source: ServerDataSource;

  data = [
    // ... our data here
  ];

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.source = this.service.getGatewayDatasource();
  }

  onSearch(query: string = '') {
    console.log({ query });
  }
}
