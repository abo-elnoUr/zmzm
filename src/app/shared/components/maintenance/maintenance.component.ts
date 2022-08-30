import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from './../../../core/services/customers.service';
import { Customers } from 'src/app/shared/models/customers';
import { CustomerMaintenence } from './../../models/customer_maintenence';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  id: string = '';
  customerById: Customers[] = [];
  customerMaintenence: CustomerMaintenence[] = [];
  customerMaintenenceById: CustomerMaintenence[] = [];
  editMode: boolean = false;

  constructor(private _Router: Router,
    private _ActivatedRoute: ActivatedRoute, private _CustomersService: CustomersService) { }

  maintenanceForm = new FormGroup({
    technician_name: new FormControl('', Validators.required),
    maintenence_type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get("id") || '{}';
    this._CustomersService.getCustomerById(parseInt(this.id)).subscribe((customerById) => {
      this.customerById = customerById;
    })

    this._CustomersService.getCustomersMaintenence(parseInt(this.id)).subscribe((customerMaintenence) => {
      this.customerMaintenence = customerMaintenence;
    })
  }

  addMiantenence() {
    this.maintenanceForm.value.id_key = this.id;
    this._CustomersService.addMaintenence(this.maintenanceForm.value).subscribe((addMAintenence) => {
      this._CustomersService.getCustomersMaintenence(parseInt(this.id)).subscribe((customerMaintenence) => {
        this.customerMaintenence = customerMaintenence;
      })
    })
    this.maintenanceForm.reset();
  }



  getMaintenenceById(id: number) {
    this._CustomersService.getCustomersMaintenence(id).subscribe((customerMaintenenceById) => {
      this.customerMaintenenceById = customerMaintenenceById;
      this.maintenanceForm.patchValue({
        technician_name: this.customerMaintenenceById[0].technician_name,
        maintenence_type: this.customerMaintenenceById[0].maintenence_type,
        price: this.customerMaintenenceById[0].price,
        date: this.customerMaintenenceById[0].date,
      })
    })
    this.editMode = true;
  }

  onUpdateMaintenence() {
    this._CustomersService.updateMaintenence(this.maintenanceForm.value, parseInt(this.id)).subscribe((updateMaintenence) => {
      this._CustomersService.getCustomersMaintenence(parseInt(this.id)).subscribe((customerMaintenence) => {
        this.customerMaintenence = customerMaintenence;
      })
      this.maintenanceForm.reset();
    })
    this.editMode = false;
  }
  deleteMaintenence(id: number) {
    this._CustomersService.deleteMaintenence(id).subscribe((delMaintenence) => {
      this._CustomersService.getCustomersMaintenence(parseInt(this.id)).subscribe((customerMaintenence) => {
        this.customerMaintenence = customerMaintenence;
      })
    })
  }
}
