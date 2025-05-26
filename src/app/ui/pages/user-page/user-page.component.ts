import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/form-util';
import { celphonePattern, emailPattern } from 'src/app/shared/constants/regex';
import { CustomValidators } from 'src/app/shared/utils/customValidators';
import { UserService } from '../../../core/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { UserRequest } from 'src/app/core/models/user.interface';
import { RolUser } from 'src/app/core/models/rolUser.interfaces';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  subscription$ = new Subscription()
  FormUtils = FormUtils
  saveIsSucces: boolean = false

  rolNames: string[] = []
  rolesUser: RolUser[] = []
  rolId!: number


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) { }

  userForm: FormGroup = this.formBuilder.group({
    identification: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13), Validators.pattern(celphonePattern)]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    birthday: ['', [Validators.required, CustomValidators.underEightteen]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required,]],
  }, {
    validators: CustomValidators.notMatching('password', 'passwordConfirm')
  })

  ngOnInit(): void {
    const loadRoles = this.userService.getAllRoles().subscribe(value => {
      this.rolNames = value.map(rol => rol.name)
      this.rolesUser = value
    })
    this.subscription$.add(loadRoles)

    const expectRolSubscribe = this.userForm.get('rol')?.valueChanges.subscribe(rolName => {
      if (rolName) {
        this.onRolSelected(rolName)
      }
    })
    this.subscription$.add(expectRolSubscribe)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  onRolSelected(rolName: string) {
    this.rolId = this.rolesUser.find(rol => rol.name == rolName)!.id
  }

  onSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let user: UserRequest = this.userForm.value
      user.rolUser = this.rolId
      try {
        this.userService.postUser(user)
        this.saveIsSucces = true
      } catch (error) {
        console.log(error);
      }
    }
  }


}
