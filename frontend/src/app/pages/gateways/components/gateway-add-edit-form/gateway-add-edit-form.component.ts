import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'gateway-add-edit-form',
  templateUrl: './gateway-add-edit-form.component.html',
  styleUrls: ['./gateway-add-edit-form.component.css'],
})
export class GatewayAddEditFormComponent implements OnInit {
  @Input() add = true;
  loading = false;

  gatewayForm = new FormGroup({
    serialNumber: new FormControl(''),
    name: new FormControl(''),
    ipv4: new FormControl(''),
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.warn(this.gatewayForm.value);
  }
}
