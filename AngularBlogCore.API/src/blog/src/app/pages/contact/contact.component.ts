import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, AbstractControl } from "@angular/forms";
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  loading: boolean;
  success: boolean;
  info: string;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {

    this.contactForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      subject: new FormControl("", Validators.required),
      message: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onsubmit() {

    if (!this.contactForm.valid)
      return false;

    this.loading = true;
    this.helperService.sendContactMail(this.contactForm.value).subscribe(data => {
      this.success = true;
      this.contactForm.reset();
      this.info = "The e-mail has been sent";
      this.loading = false;
    }, error => {
      this.success = false;
      this.info = "There is an error!";
      this.loading = false;
    }
    );
  }

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

  get getControls() {
    return this.contactForm.controls
  }

}
