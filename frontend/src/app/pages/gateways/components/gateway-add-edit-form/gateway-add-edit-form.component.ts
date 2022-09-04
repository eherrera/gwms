import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Gateway } from '@/models/gateway';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ipv4Validator } from '@/directives/ipv4.directive';
import { FormBuilder } from '@angular/forms';
import { CrudModeView } from '@/models/crud';

@Component({
  selector: 'gateway-add-edit-form',
  templateUrl: './gateway-add-edit-form.component.html',
  styleUrls: ['./gateway-add-edit-form.component.css'],
})
export class GatewayAddEditFormComponent implements OnInit {
  CrudModeView = CrudModeView;
  @Input() crudMode: CrudModeView = CrudModeView.Add;
  loading = false;

  globalErrors = [];

  maxDevices = 10;

  fields = {
    name: 'Name',
    serialNumber: 'Serial number',
    ipv4: 'IP v4',
    uid: 'Uid',
    vendor: 'Vendor',
    created: 'Created',
    status: 'Status',
    statusOnline: 'Online',
  };

  get serialNumber() {
    return this.gatewayForm.get('serialNumber');
  }

  get name() {
    return this.gatewayForm.get('name');
  }

  get ipv4() {
    return this.gatewayForm.get('ipv4');
  }

  uid(index: number) {
    return this.devices().get(`${index}`).get('uid');
  }

  vendor(index: number) {
    return this.devices().get(`${index}`).get('vendor');
  }

  created(index: number) {
    return this.devices().get(`${index}`).get('created');
  }

  get now() {
    return new Date().toISOString().split('T')[0];
  }

  errors = {
    IS_EMPTY: 'is empty',
    NOT_A_VALID_IP: 'is not a valid ip v4',
    GATEWAY_ALREADY_EXISTS:
      'Gateway with the same serial number already exists',
    // ...
  };

  newDevice(): FormGroup {
    return this.fb.group({
      uid: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      vendor: new FormControl('', [
        Validators.required,
        Validators.maxLength(24),
      ]),
      created: new FormControl('', [Validators.required]),
      status: new FormControl(true),
    });
  }

  gatewayForm = new FormGroup({
    serialNumber: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.maxLength(24),
    ]),
    name: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.maxLength(24),
    ]),
    ipv4: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      ipv4Validator(),
    ]),
    devices: this.fb.array([]),
  });

  devices(): FormArray {
    return this.gatewayForm.get('devices') as FormArray;
  }

  constructor(
    private service: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.crudMode == CrudModeView.Details) {
      this.gatewayForm.disable();
    }
  }

  resetState = (res?: any) => {
    this.loading = false;
    this.gatewayForm.enable();
  };

  processServerErrors = (err: HttpErrorResponse) => {
    this.globalErrors = [];
    const displayName = (param: string, dict: object) => {
      if (dict[param]) {
        return dict[param];
      }
      return param;
    };
    if (!err.error || !err.error.errors || !err.error.errors.msg) {
      return;
    }

    if (typeof err.error.errors.msg === 'string') {
      const readableErrMsg = displayName(err.error.errors.msg, this.errors);
      this.globalErrors.push(readableErrMsg);
      return;
    }

    if (!Array.isArray(err.error.errors.msg)) {
      return;
    }

    err.error.errors.msg.forEach((e) => {
      this.globalErrors.push(
        `${displayName(e.param, this.fields)} ${displayName(
          e.msg,
          this.errors
        )}`
      );
    });
  };

  validateDevicesSubmit() {
    var deviceCount = this.gatewayForm.value.devices.length;
    if (this.maxDevices < deviceCount) {
      this.globalErrors.push(
        `No more that ${this.maxDevices} peripheral devices are allowed for a gateway.`
      );
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.gatewayForm.valid) {
      return;
    }

    // console.log(this.gatewayForm.value);

    this.loading = true;
    this.globalErrors = [];
    this.gatewayForm.disable();

    var ok = this.validateDevicesSubmit();
    if (!ok) {
      this.resetState();
      return;
    }

    if (this.crudMode == CrudModeView.Add) {
      this.service
        .postGateway({
          serial_number: this.gatewayForm.value.serialNumber,
          name: this.gatewayForm.value.name,
          ipv4: this.gatewayForm.value.ipv4,
          devices: this.gatewayForm.value.devices,
        })
        .subscribe(
          (gateway: Gateway) => {
            this.resetState(gateway);
            this.toastr.success('Gateway was saved successfully!');
            this.router.navigate(['/']);
          },
          (err: HttpErrorResponse) => {
            this.resetState(err);
            this.toastr.error('Form is not valid!');
            this.processServerErrors(err);
          }
        );
    }
  }

  addDeviceControl() {
    this.devices().push(this.newDevice());
  }

  removeDeviceControl(i: number) {
    this.devices().removeAt(i);
  }
}
