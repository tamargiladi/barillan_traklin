import { Component } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'barlillan-traklin';

  constructor(private tableService: TableService) {}

  public fields = [
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
      options: [
        {
          label: 'מדעים מדוייקים',
          value: 'Science',
        },
        {
          label: 'מדעי החיים',
          value: 'Art',
        },
        {
          label: 'הנדסה',
          value: 'Engineering',
        },
        {
          label: 'יהדות',
          value: 'Judaism',
        },
        {
          label: 'מדעי החברה',
          value: 'Social',
        },
        {
          label: 'חינוך',
          value: 'Education',
        },
        {
          label: 'רפואה',
          value: 'Medicine',
        },
        {
          label: 'מדעי הרוח',
          value: 'Humanities',
        },
        {
          label: 'הנהלה בכירה',
          value: 'Managment',
        },
      ],
    },
    {
      label: 'מועד המפגש',
      name: 'Time',
      type: 'select',
      required: true,
      options: [
        {
          label: '06/07 22:00',
        },
      ],
    },
    {
      label: 'אקדמי/מנהלי', 
      type: 'radio',
      name: 'job',
      required: true,
      options: [
        
        {
          label:'aaa',
          value: ''
      },
      {
        label:'vvv',
      value: ''
    }
      ]

    },
    
  ];
}
