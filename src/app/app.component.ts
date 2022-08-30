import { Component } from '@angular/core';
import { CustomersService } from './core/services/customers.service';
import { DatePipe } from '@angular/common';
import { Customers } from './shared/models/customers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zmzm';

  myDate: Date = new Date();
  realDate: string = '';
  numberOfMonths: Customers[] = [];
  maintenenceData: Customers[] = [];


  constructor(private datePipe: DatePipe, private _CustomersService: CustomersService, public translate: TranslateService) {
    this.realDate = this.datePipe.transform(this.myDate, 'yyyy/MM/dd') || '{} ';

    this._CustomersService.getNumberOfMAintenenceMonths().subscribe((numberOfMonths) => {
      this.numberOfMonths = numberOfMonths;
      this.numberOfMonths.forEach((value) => {
        var day = parseInt((value.day).toString());
        var month = parseInt((value.month).toString());
        var month_now = new Date().toLocaleString('en-US', { month: '2-digit' });
        var day_now = new Date().toLocaleString('en-US', { day: '2-digit' });
        var sum = month + parseInt((value.maintenence_months).toString());
        if (month == parseInt(month_now) && day == parseInt(day_now)) {
          this._CustomersService.getCustomerById(value.id).subscribe((maintenenceData) => {
            this.maintenenceData = maintenenceData;
            this._CustomersService.addDailyMaintenence(this.maintenenceData[0]).subscribe((addDailyMaintenence) => {
              if (sum > 12) {
                sum %= 12;
                this._CustomersService.addUpdatedMonth(sum, value.id).subscribe((addUpdate) => {
                  this._CustomersService.getNumberOfMAintenenceMonths().subscribe((numberOfMonths) => {
                    this.numberOfMonths = numberOfMonths;
                  })
                })
              }
              else {
                this._CustomersService.addUpdatedMonth(sum, value.id).subscribe((addUpdate) => {
                  this._CustomersService.getNumberOfMAintenenceMonths().subscribe((numberOfMonths) => {
                    this.numberOfMonths = numberOfMonths;
                  })
                })
              }
            })
          })
        }
      });
    })
  }
}
