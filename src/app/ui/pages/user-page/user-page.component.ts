import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  constructor(
    private readonly formBuilder:FormBuilder
  ) {}

  userForm = this.formBuilder.group({
    identification: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    celphone: ['', [Validators.required]],
    eMail: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
  })

}
