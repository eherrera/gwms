import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { CustomServerDataSource } from '@services/custom-server-datasource';
import { Router } from '@angular/router';
import { DeleteResponse } from '@/models/gateway';
import { ToastrService } from 'ngx-toastr';

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
      delete: false,
      edit: false,
      add: false,
      custom: [
        {
          name: 'details',
          title: 'Details ',
        },
        {
          name: 'edit',
          title: 'Edit ',
        },
        {
          name: 'delete',
          title: 'Delete ',
        },
      ],
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
        title: 'IP',
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

  constructor(
    private service: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
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

  deleteGateway(id: string) {
    if (confirm('Are you sure?') !== true) {
      return;
    }
    this.service.deleteGateway(id).subscribe(
      (response: DeleteResponse) => {
        if (response && response.msg === 'DELETED') {
          this.toastr.success(`Gateway deleted successfully!`);
        }
        this.onSearch();
      },
      (err) => {
        console.log({ err });
        this.toastr.error(`Error deleting Gateway`);
      }
    );
  }

  onCustom(event) {
    console.log(
      `Custom event '${event.action}' fired on row №: ${event.data._id}`
    );
    switch (event.action) {
      case 'details':
        this.router.navigate([`/gateway-details/${event.data._id}`]);
        break;
      case 'edit':
        this.router.navigate([`/edit-gateway/${event.data._id}`]);
        break;
      case 'delete':
        this.deleteGateway(event.data._id);
        break;

      default:
        break;
    }
  }
}
