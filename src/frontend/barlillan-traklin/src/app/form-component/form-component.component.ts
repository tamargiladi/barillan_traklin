import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { a } from 'src/server/parser.service';
import { TableService } from '../services/table.service';
import { mergeMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FacultyOptions, Field,  } from '../types/types';
@UntilDestroy()
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
})
export class GenericFormComponent{
  @Input() fields: Field[] = [];
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  isError: boolean = false;
  errorMessage = '';
  allData: any;
  notCompleted = true;
  loading = false;
  loadingPage = false;
  constructor(private tableService: TableService) {
    this.tableService
      .getAllFaculties()
      .pipe(untilDestroyed(this))
      .subscribe((c) => {
        this.allData = c.data;
      });
  }
  onSubmit() {
    this.isError = false;
    let facultyRelevant = this.fields[1]?.value
  
    if (this.fields[0].value === '') {
      this.errorMessage = 'יש להכניס שם מלא\n';
      this.isError = true;
      return;
    }
      if (!this.fields[1]?.value) {
        this.errorMessage = 'נא לבחור השתייכות';
        this.isError = true;
        return;
      }
    
      else {
        const selectedDate = this.fields[2].value;
        const totalInFaculty = this.getFacultyTotal(facultyRelevant, selectedDate).length;
        if (totalInFaculty >= 4) {
          this.errorMessage = 'פקולטה זו בתפוסה מלאה. נס/י לבחור תאריך אחר';
          this.isError = true;
          return;
        }

        
          this.iterateOver(facultyRelevant);
        
      }
  }

  changeSelect(event: any) {
    console.log('event:', event);
  }

  iterateOver(field: FacultyOptions) {
    this.loading = true;
    const nameValue = this.fields[0]?.value;
    const dateValue = this.fields[2]?.value;
    let obs$;
        obs$ = this.tableService
          .addRow([[nameValue, field, dateValue, this.fields[3].value]])
          .pipe(
            untilDestroyed(this),
            mergeMap(() => {
              return this.tableService.getAllFaculties();
            }),
            tap(() => {
              this.notCompleted = false;
            })
          );
    
    (obs$ as never as any).pipe(untilDestroyed(this)).subscribe();
  }


  private getFacultyTotal(faculty: string, selectedDate: string): any[] {
    const filterdData = this.allData.filter((item: any) => {
      return item.Faculty === faculty && item.Date === selectedDate
    });
    return [...filterdData];
  }
}


