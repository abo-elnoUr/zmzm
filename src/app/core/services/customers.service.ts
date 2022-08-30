import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customers } from 'src/app/shared/models/customers';
import { CustomerMaintenence } from './../../shared/models/customer_maintenence';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  url = 'http://localhost/zmzm/';
  constructor(private _HttpClient: HttpClient) { }

  // *************** customers ***************

  getCustomers() {
    return this._HttpClient.get<Customers[]>(this.url + 'getCustomers.php');
  }

  getCustomerById(id: number) {
    return this._HttpClient.get<Customers[]>(this.url + 'getCustomerById.php?id=' + id);
  }

  addCustomer(customer: Customers) {
    return this._HttpClient.post<Customers[]>(this.url + 'addCustomer.php', customer);
  }

  updateCustomer(customer: Customers, id: number) {
    return this._HttpClient.put<Customers[]>(this.url + 'updateCustomer.php?id=' + id, customer);
  }

  deleteCustomer(id: number) {
    return this._HttpClient.delete<Customers[]>(this.url + 'deleteCustomer.php?id=' + id);
  }

  getNumberOfMAintenenceMonths() {
    return this._HttpClient.get<Customers[]>(this.url + 'getNumberOfMAintenenceMonths.php');
  }

  // *************** customers maintenence ***************

  getCustomersMaintenence(id: number) {
    return this._HttpClient.get<CustomerMaintenence[]>(this.url + 'getCustomersMaintenence.php?id=' + id);
  }

  addMaintenence(maintenence: CustomerMaintenence) {
    return this._HttpClient.post<CustomerMaintenence[]>(this.url + 'addMaintenence.php', maintenence);
  }

  updateMaintenence(maintenence: CustomerMaintenence, id: number) {
    return this._HttpClient.put<CustomerMaintenence[]>(this.url + 'updateMaintenence.php?id=' + id, maintenence);
  }

  deleteMaintenence(id: number) {
    return this._HttpClient.delete<CustomerMaintenence[]>(this.url + 'deleteMaintenence.php?id=' + id);
  }

  deleteCustomerWithMaintenence(id: number) {
    return this._HttpClient.delete<CustomerMaintenence[]>(this.url + 'deleteCustomerWithMaintenence.php?id=' + id);
  }

  // *************** daily maintenence ***************

  getDailyMaintenence() {
    return this._HttpClient.get<Customers[]>(this.url + 'getDailyMaintenence.php');
  }

  addDailyMaintenence(maintenence: Customers) {
    return this._HttpClient.post<Customers[]>(this.url + 'addDailyMaintenence.php', maintenence);
  }

  addUpdatedMonth(month: number, id: number) {
    return this._HttpClient.put<Customers[]>(this.url + 'addUpdatedMonth.php?id=' + id, { month });
  }

  addUpdatedDay(day: number, id: number) {
    return this._HttpClient.put<Customers[]>(this.url + 'addUpdatedDay.php?id=' + id, { day });
  }

  deleteDailyMaintenence(id: number) {
    return this._HttpClient.delete<Customers[]>(this.url + 'deleteDailyMaintenence.php?id=' + id);
  }

}
