import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
import {
  cantBeStrider,
  emailPattern,
  firstNameAndLastnamePattern,
} from 'src/app/shared/validators/validators';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsServices: ValidatorsService
  ) {}

  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsServices.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsServices.emailPattern),
        ],
        [new EmailValidator()],
      ],
      username: [
        '',
        [Validators.required, this.validatorsServices.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsServices.isFieldOneEqualFieldTwo(
          'password',
          'password2'
        ),
      ],
    }
  );

  isValidField(field: string) {
    return this.validatorsServices.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
