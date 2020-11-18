import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Errors } from 'src/app/_model/error.model';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.css']
})
export class ErrorsListComponent implements OnChanges {
  @Input() errors: Errors;
  errors_List: string[] = [];

  constructor() { }

  ngOnChanges() {
    this.setErrors(this.errors);
  }
  
  setErrors(errors: Errors) {
    this.errors_List = Object.keys(this.errors || {})
      .map(key => `${key} ${this.errors[key]}`);
  }
}
