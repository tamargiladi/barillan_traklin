import { Component, EventEmitter, Input, Output } from '@angular/core';
import { a } from 'src/server/parser.service';
import { TableService } from '../services/table.service';
import { mergeMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
})
export class GenericFormComponent {
  @Input() fields: Field[] = [];
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  isError: boolean = false;
  errorMessage = '';
  objectFaculties: any;
  notCompleted = true;
  loading = false;
  constructor(private tableService: TableService) {
    this.tableService
      .getAllFaculties()
      .pipe(untilDestroyed(this))
      .subscribe((c) => {
        this.objectFaculties = c;
      });
  }
  onSubmit() {
    this.isError = false;
    let facultyRelevant: any;

    if (this.fields[0].value === '') {
      this.errorMessage = 'יש להכניס שם מלא\n';
      this.isError = true;
    }
    this.objectFaculties.data.forEach((faculty: any) => {
      if (!this.fields[1]?.value) {
        this.errorMessage = 'נא לבחור השתייכות';
        this.isError = true;
      } else if (faculty.Name_of_Faculty === this.fields[1]?.value) {
        facultyRelevant = faculty;
        if (faculty.Participant_no_4 !== 'NONE') {
          this.errorMessage = 'אין יותר מקום - נא לבחור השתייכות אחרת\n';
          this.isError = true;
          return;
        }

        if (!this.isError) {
          this.iterateOver(facultyRelevant);
        }
        
      }
    });
  }

  changeSelect(event: any) {
    console.log('event:', event);
  }

  iterateOver(field: any) {
    this.loading = true;
    let obs$;
    for (let i = 1; i <= 4; i++) {
      if (field[`Participant_no_${i}`] === 'NONE') {
        const idName: number = this.getRowIdByNameOfFaculty(
          field.Name_of_Faculty
        );
        obs$ = this.tableService
          .updateRow(this.fields[0].value, i, idName)
          .pipe(
            untilDestroyed(this),
            mergeMap(() => {
              return this.tableService.getAllFaculties();
            }),
            tap(() => {
              this.notCompleted = false;
            })
          );
        break;
      }
    }

    (obs$ as never as any).subscribe();
  }

  private getRowIdByNameOfFaculty(name: string) {
    switch (name) {
      case 'Science':
        return 2;
      case 'Art':
        return 3;
      case 'Engineering':
        return 4;
      case 'Judaism':
        return 5;
      case 'Social':
        return 6;
      case 'Education':
        return 7;
      case 'Medicine':
        return 8;
      case 'Managment':
        return 9;
      case 'Humanities':
        return 10;
      default:
        return -1; // Return -1 for unrecognized faculty names
    }
  }
}

interface Field {
  label: string;
  name: string;
  type: string;
  value?: any;
  required: boolean;
  options?: SelectOption[];
}

interface SelectOption {
  label: string;
  value?: any;
}
