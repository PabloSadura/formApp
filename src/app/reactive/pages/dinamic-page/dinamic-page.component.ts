import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: [],
})
export class DinamicPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsServices: ValidatorsService
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGames: this.fb.array([
      ['Meta Gear', Validators.required],
      ['Dead Stranding', Validators.required],
      ['Good Of War', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddTofavoites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      return this.myForm.markAsTouched();
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
  isValidField(field: string): boolean | null {
    return this.validatorsServices.isValidField(this.myForm, field);
  }
}
