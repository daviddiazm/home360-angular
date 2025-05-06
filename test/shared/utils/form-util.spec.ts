
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../src/app/shared/utils/form-util';

describe('FormUtils', () => {

  describe('getTextErros', () => {
    it('should return required error message', () => {
      const errors = { required: true };
      const msg = FormUtils.getTextErros(errors);
      expect(msg).toBe('El campo es requerido');
    });

    it('should return minlength error message', () => {
      const errors = { minlength: { requiredLength: 5 } };
      const msg = FormUtils.getTextErros(errors);
      expect(msg).toBe('Ingresar un mínimo de 5 caracteres');
    });

    it('should return maxlength error message', () => {
      const errors = { maxlength: { requiredLength: 10 } };
      const msg = FormUtils.getTextErros(errors);
      expect(msg).toBe('Ingresar un máximo de 10 caracteres');
    });

    it('should return nameExists error message', () => {
      const errors = { nameExists: true };
      const msg = FormUtils.getTextErros(errors);
      expect(msg).toBe('Ya existe una categoría con ese nombre');
    });

    it('should return null for unknown errors', () => {
      const errors = { unknown: true };
      const msg = FormUtils.getTextErros(errors);
      expect(msg).toBeNull();
    });
  });

  describe('getFiledError', () => {
    it('should return null if control does not exist', () => {
      const form = new FormGroup({});
      const msg = FormUtils.getFiledError(form, 'nonexistent');
      expect(msg).toBeNull();
    });

    it('should return null if control is not touched', () => {
      const form = new FormGroup({
        name: new FormControl('', [Validators.required])
      });
      const msg = FormUtils.getFiledError(form, 'name');
      expect(msg).toBeNull();
    });

    it('should return required message if control is touched and invalid', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();

      const form = new FormGroup({ name: control });
      const msg = FormUtils.getFiledError(form, 'name');
      expect(msg).toBe('El campo es requerido');
    });
  });

});
