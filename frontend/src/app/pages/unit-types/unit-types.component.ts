import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { UnitType } from '@/models/models';

@Component({
  selector: 'app-unit-types',
  templateUrl: './unit-types.component.html',
  styleUrls: ['./unit-types.component.css']
})
export class UnitTypesComponent implements OnInit {

  unitTypes: Array<UnitType>;
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.service.getUnitTypes(1).subscribe(uts => this.unitTypes = uts);
  }

}
