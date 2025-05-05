import { FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {

  static getTextErros (errors: ValidationErrors) {
    for( const key of Object.keys(errors) ) {
      switch(key) {
        case "required" :
          return "el campo es requerido"
        case "minlength":
          return `ingresar un minimo de ${ errors["minlength"].requiredLength } caracteres`
        case "maxlength":
          return `ingresar un maximo de ${ errors["maxlength"].requiredLength } caracteres`
        case "nameExists":
          return "ya existe una categoria con ese nombre"
      }
    }
    return null
  }

  static getFiledError( form: FormGroup, controlName: string): string | null {
    if( !form.controls[controlName] ) return null
    if( !form.controls[controlName].touched ) return null
    const errors = form.controls[controlName].errors ?? {}
    return FormUtils.getTextErros(errors)
  }
}
