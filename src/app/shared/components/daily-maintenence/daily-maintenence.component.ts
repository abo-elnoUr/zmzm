import { Component, OnInit } from '@angular/core';
import { Customers } from '../../models/customers';
import { CustomersService } from './../../../core/services/customers.service';

@Component({
  selector: 'app-daily-maintenence',
  templateUrl: './daily-maintenence.component.html',
  styleUrls: ['./daily-maintenence.component.scss']
})
export class DailyMaintenenceComponent implements OnInit {
  maintenence: Customers[] = [];
  constructor(private _CustomersService: CustomersService) { }

  ngOnInit(): void {
    this._CustomersService.getDailyMaintenence().subscribe((maintenence) => {
      this.maintenence = maintenence;
    })
  }
  onDeleteDailyMaintenence(id: number, customer_id: number) {
    var day_now = new Date().toLocaleString('en-US', { day: '2-digit' });
    this._CustomersService.addUpdatedDay(parseInt(day_now), customer_id).subscribe((updateDay) => {
      this._CustomersService.deleteDailyMaintenence(id).subscribe((delDailyMaintenence) => {
        this._CustomersService.getDailyMaintenence().subscribe((maintenence) => {
          this.maintenence = maintenence;
        })
      })
    })
  }
}
