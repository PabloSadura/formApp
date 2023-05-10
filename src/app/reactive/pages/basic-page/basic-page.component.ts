import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

const product = {
  name: 'RTX 3020',
  price: 1200,
  inStorage: 7,
};
@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name:new FormControl('',[],[])
  // });
  constructor(
    private fb: FormBuilder,
    private validatorsServices: ValidatorsService
  ) {}

  ngOnInit(): void {
    // this.myForm.reset(product);
  }

  isValidField(field: string): boolean | null {
    return this.validatorsServices.isValidField(this.myForm, field);
  }
  getFieldErro(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
