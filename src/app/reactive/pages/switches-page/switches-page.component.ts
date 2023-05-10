import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsServices: ValidatorsService
  ) {}

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termsAndConditions: [false, Validators.required],
  });

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
  isValidField(field: string): boolean | null {
    return this.validatorsServices.isValidField(this.myForm, field);
  }
}
