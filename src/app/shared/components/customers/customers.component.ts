import { Component, OnInit } from '@angular/core';
import { CustomersService } from './../../../core/services/customers.service';
import { Customers } from '../../models/customers';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  search: string = "";
  customers: Customers[] = [];
  customerById: Customers[] = [];
  editMode: boolean = false;
  id: number = 0;

  constructor(private _CustomersService: CustomersService, private _Router: Router) { }

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    customer_code: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    number_of_device: new FormControl('', Validators.required),
    device_type: new FormControl('', Validators.required),
    number_of_steps: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    maintenence_months: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });
  get listFormValidate() {
    return this.customerForm.controls;
  }

  ngOnInit(): void {
    this._CustomersService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    })
  }

  getCustomerId(id: number) {
    this._Router.navigate(["maintenance/" + id]);
  }

  addCustomer() {
    var day = +formatDate(this.customerForm.value.date, 'dd', 'en');
    var month = +formatDate(this.customerForm.value.date, 'MM', 'en');
    this.customerForm.value.day = day;
    this.customerForm.value.month = month;
    this._CustomersService.addCustomer(this.customerForm.value).subscribe((addCustomer) => {
      this._CustomersService.getCustomers().subscribe((customers) => {
        this.customers = customers;
      })
    })
    this.customerForm.reset();
  }

  getCustomerById(id: number) {
    this._CustomersService.getCustomerById(id).subscribe((customerById) => {
      this.customerById = customerById;
      this.id = this.customerById[0].id;
      this.customerForm.patchValue({
        name: this.customerById[0].name,
        customer_code: this.customerById[0].customer_code,
        mobile: this.customerById[0].mobile,
        number_of_device: this.customerById[0].number_of_device,
        device_type: this.customerById[0].device_type,
        number_of_steps: this.customerById[0].number_of_steps,
        price: this.customerById[0].price,
        maintenence_months: this.customerById[0].maintenence_months,
        address: this.customerById[0].address,
        line: this.customerById[0].line,
        notes: this.customerById[0].notes,
        date: this.customerById[0].date,
      })
    })
    this.editMode = true;
  }

  onUpdateCustomer() {
    this._CustomersService.updateCustomer(this.customerForm.value, this.id).subscribe((updateCustomer) => {
      this._CustomersService.getCustomers().subscribe((customers) => {
        this.customers = customers;
      })
      this.customerForm.reset();
    })
    this.editMode = false;
  }

  deleteCustomer(id: number) {
    this._CustomersService.deleteCustomer(id).subscribe((delCustomer) => {
      this._CustomersService.deleteCustomerWithMaintenence(id).subscribe((delMaintenence) => {
        this._CustomersService.getCustomers().subscribe((customers) => {
          this.customers = customers;
        })
      })
    })
  }

}
