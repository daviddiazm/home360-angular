import { ValidationErrors } from "@angular/forms";

export const FORM_ERROR_MESSAGES: Record<string, string | ((error: ValidationErrors) => string)> = {
  required: 'El campo es requerido',
  pattern: 'Ingresar un valor valido',
  minlength: (error: any) => `Ingresar un mínimo de ${error.requiredLength} caracteres`,
  maxlength: (error: any) => `Ingresar un máximo de ${error.requiredLength} caracteres`,
  nameExists: 'Ya existe una categoría con ese nombre',
  notMatching: "las contraseñas no coinciden",
  underEightteen: "El usaurio tiene que ser mayor a 18 años",
  invalidDate: "La fecha es invalida"
};
