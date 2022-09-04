import { Component, OnInit, Input } from '@angular/core';
import { CrudModeView } from '@/models/crud';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'gateway-add-edit',
  templateUrl: './gateway-add-edit.component.html',
  styleUrls: ['./gateway-add-edit.component.css'],
})
export class GatewayAddEditComponent implements OnInit {
  CrudModeView = CrudModeView;
  @Input() crudMode: CrudModeView = CrudModeView.Add;

  id: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.crudMode = CrudModeView.Add;
      this.id = params['id'];
      if (this.id) {
        if (this.router.url.startsWith('/edit')) {
          this.crudMode = CrudModeView.Edit;
        } else {
          this.crudMode = CrudModeView.Details;
        }
      }
    });
  }
}
