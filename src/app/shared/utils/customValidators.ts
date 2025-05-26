import { ValidationErrors, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators  {

  static valueEquals(controlName : string, controlNameConfirm: string  ): ValidatorFn {
    return (formGroup: AbstractControl ): ValidationErrors | null => {
      const form: FormGroup = formGroup as FormGroup
      const control = form.get(controlName)
      const controlConfirm = form.get(controlNameConfirm)
      if(control?.value !== controlConfirm?.value) {
        return {
          valuesAreNotSame: true
        }
      }
      return null
    }
  }

  static notMatching(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ notMatching: true  });
        return { notMatching: true };
      } else {
        return null;
      }
    };
  }

  static underEightteen(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  try {
    const birthdayDate = new Date(control.value);

    if (isNaN(birthdayDate.getTime())) {
      return { invalidDate: true };
    }

    const today = new Date();
    let age = today.getFullYear() - birthdayDate.getFullYear();
    const monthDiff = today.getMonth() - birthdayDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
      age--;
    }
    console.log({birthdayDate, age, today, monthDiff});

    return age < 18 ? { underEightteen: true } : null;
  } catch (error) {
    console.log(error);
    return { invalidDate: true };
  }
}
}
