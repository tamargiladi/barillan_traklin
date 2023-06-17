import { Component, OnInit } from '@angular/core';
import { TableService } from './services/table.service';
import { FacultyOptions } from './types/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'barlillan-traklin';
  public fields: any;
  public datesOptions: any[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.getAllDates().subscribe((datesValues)=>{
      this.datesOptions = datesValues;
      this.initFields();
  });
   
  }



  getAllDates(): Observable<any> {
    return this.tableService.getAllDates().pipe(map((dataObject)=>{
      return dataObject.map((item: any) => {
        const date = item.Date
        const fullDateValue = `${date} ${ item.Time}`;
        return {label: fullDateValue, value: date};
      })

    }),untilDestroyed(this));
  }

  initFields() {
    this.fields = [
      {
        label: 'שם מלא',
        name: 'fullName',
        type: 'text',
        required: true,
        value: '',
      },
      {
        label: 'השתייכות',
        name: 'Faculty',
        type: 'select',
        required: true,
        options: [{label: 'בחר/י השתייכות', disabled: true}, ...this.getAllFaculties()]
      },
      {
        label: 'מועד המפגש',
        name: 'Time',
        type: 'select',
        required: true,
        options: [{label: 'בחר/י תאריך', disabled: true},...this.datesOptions],
      },
      {
        label: 'סגל',
        name: 'Stagg',
        type: 'select',
        required: true,
        options: [
          {label: 'בחר/י אפשרות', disabled: true},  
          {
            label: 'סגל מנהלי',
            value: 'סגל מנהלי',

          },
          {
            label: 'סגל אקדמי',
            value: 'סגל אקדמי',
          },
        ],
      },
    ];
    
  }

  getAllFaculties(): {label: string, value: string}[]{
    return Object.values(FacultyOptions).map((value) => {
      return {label: value, value};
    })
  }
  
}
