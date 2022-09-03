import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { CustomServerDataSource } from '@services/custom-server-datasource';

@Component({
  selector: 'gateways-main-table',
  templateUrl: './gateways-main-table.component.html',
  styleUrls: ['./gateways-main-table.component.css'],
})
export class GatewaysMainTableComponent implements OnInit {
  NO_DATA_FOUND = 'No data found';
  settings = {
    noDataMessage: this.NO_DATA_FOUND,
    pager: {
      display: true,
      perPage: 10,
    },
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
        title: 'Devices',
        editable: false,
        filter: false,
      },
    },
  };

  serverError = null;

  source: CustomServerDataSource;

  public isLoadingData = false;

  constructor(private service: ApiService) {
    this.source = this.service.getGatewayDatasource();
    this.source.onUpdateStarted().subscribe((promise: Promise<any>) => {
      this.serverError = null;
      setTimeout(() => (this.isLoadingData = true));
      promise.catch((error) => {
        setTimeout(() => (this.isLoadingData = false));
        this.serverError = 'Ups, something went wrong.';
      });
    });
  }

  ngOnInit() {
    this.source.onChanged().subscribe(() => {
      setTimeout(() => (this.isLoadingData = false));
    });
  }

  onSearch(query: string = '') {
    if (typeof query === 'string') {
      this.source.setFilter(
        [
          {
            field: 'any',
            search: query,
          },
        ],
        true
      );
    }
  }
}
