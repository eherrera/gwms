import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Gateway } from '@/models/gateway';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'gateway-add-edit-form',
  templateUrl: './gateway-add-edit-form.component.html',
  styleUrls: ['./gateway-add-edit-form.component.css'],
})
export class GatewayAddEditFormComponent implements OnInit {
  @Input() add = true;
  loading = false;

  serverErrors = [];

  gatewayForm = new FormGroup({
    serialNumber: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    name: new FormControl({ value: '', disabled: false }, Validators.required),
    ipv4: new FormControl({ value: '', disabled: false }, Validators.required),
  });
  constructor(private service: ApiService) {}

  ngOnInit() {}

  resetState = (res: any) => {
    console.log({ res });
    this.loading = false;
    this.gatewayForm.enable();
  };

  processServerErrors = (err: HttpErrorResponse) => {
    this.serverErrors = [];
    if (
      !err.error ||
      !err.error.errors ||
      !err.error.errors.msg ||
      !Array.isArray(err.error.errors.msg)
    ) {
      return;
    }
    const fields = {
      name: 'Name',
      serialNumber: 'Serial number',
      ipv4: 'IP v4',
    };
    const errors = {
      IS_EMPTY: 'is empty',
      NOT_A_VALID_IP: 'is not a valid ip v4',
      // ...
    };
    const displayName = (param: string, dict: object) => {
      if (dict[param]) {
        return dict[param];
      }
      return param;
    };

    err.error.errors.msg.forEach((e) => {
      this.serverErrors.push(
        `${displayName(e.param, fields)} ${displayName(e.msg, errors)}`
      );
    });
  };

  onSubmit() {
    console.warn(this.gatewayForm.value);

    this.loading = true;
    this.serverErrors = [];
    this.gatewayForm.disable();

    if (this.add) {
      this.service
        .postGateway({
          serial_number: this.gatewayForm.value.serialNumber,
          name: this.gatewayForm.value.name,
          ipv4: this.gatewayForm.value.ipv4,
        })
        .subscribe(
          (gateway: Gateway) => {
            this.resetState(gateway);
          },
          (err: HttpErrorResponse) => {
            this.resetState(err);
            this.processServerErrors(err);
          }
        );
    }
  }
}
