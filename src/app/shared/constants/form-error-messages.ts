
export const FORM_ERROR_MESSAGES: Record<string, string | ((error: any) => string)> = {
  required: 'El campo es requerido',
  minlength: (error: any) => `Ingresar un mínimo de ${error.requiredLength} caracteres`,
  maxlength: (error: any) => `Ingresar un máximo de ${error.requiredLength} caracteres`,
  nameExists: 'Ya existe una categoría con ese nombre',
};
