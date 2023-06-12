import { Component, EventEmitter, Input, Output } from '@angular/core';
import { a } from 'src/server/parser.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class GenericFormComponent {
  @Input() fields: Field[] = [];
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    
    console.log('fields:', this.fields);

  }
}

interface Field {
  label: string;
  name: string;
  type: string;
  value?: any;
  required: boolean;
}