import { Component } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barlillan-traklin';
  
  constructor(private tableService: TableService) {

  }


  public fields = [{
    label: 'שם מלא',
    name: 'fullName',
    type: 'text',
    required: true,
  },
  {
    label: 'פקולטה',
    name: 'Faculty',
    type: 'select',
    required: true,
    options:  [
      {
        label:  "Science",
        value: "Science",
      },
      {
        label: "Art",
        value: "Art",
      },
      {
        label: "Engineering",
        value: "Engineering",
      },
      {
        label: "Judaism",
        value: "Judaism",
      },
      {
        label: "Social",
        value: "Social",
      },
      {
        label: "Education",
        value: "Education",
      },
      {
        label: "Medicine",
        value: "Medicine",
      },
      {
        label: "Managment",
        value: "Managment",
      },
      {
        label: "Humanities",
        value: "Humanities",
      }
    ]},
{
  label: 'תאריך ושעה',
  name: 'Time',
  type: 'select',
  required: true,
  options: [{
    label: '06/07',
  }
]
}]

}