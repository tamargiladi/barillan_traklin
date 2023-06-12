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
    this.tableService.getAllFaculties().subscribe((c)=>{
      let cObj: any = c;
      console.log('cObj:', cObj.data);
      cObj.data.forEach((d: any) => {
        
        d.count = Number(d.count);
      })
        console.log('c:',c);
    });
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
  }]
}
