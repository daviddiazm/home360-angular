import { FormGroup, ValidationErrors } from '@angular/forms';
import { FORM_ERROR_MESSAGES } from '../constants/form-error-messages';
export class FormUtils {

  static getTextErros(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      const errorMessage = FORM_ERROR_MESSAGES[key]
      if (typeof (errorMessage) === "string") {
        return errorMessage
      } else if (typeof (errorMessage) === "function") {
        return errorMessage(errors[key])
      }
    }
    return null
  }


  static getFiledError(form: FormGroup, controlName: string): string | null {
    if (!form.controls[controlName]) return null
    if (!form.controls[controlName].touched) return null
    const errors = form.controls[controlName].errors ?? {}
    return FormUtils.getTextErros(errors)
  }
}
