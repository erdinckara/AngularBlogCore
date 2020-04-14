import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MyvalidationService {

  constructor() { }


  getValidationMessage(f: AbstractControl, name: string) {
    if (f.errors) {
      for (let errorName in f.errors) {
        if (errorName == "required")
          return `${name} can not be null`;
        else if (errorName == "email")
          return `email format is not valid`;
        else if (errorName == "minlength")
          return `${name} must be minimum 10 character.`;
      }
    }
  }


}
