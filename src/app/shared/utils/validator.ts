import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateEmail(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const valid = emailRegex.test(value);
    return valid ? null : { invalidEmail: true }; 
  }

export function validarnombre(control: AbstractControl): ValidationErrors | null {
    const nombreRegex = /^[a-zA-Z\s]+$/; 
    const valid = nombreRegex.test(control.value);
    return valid ? null : { invalidNombre: true }; 
  }

  export function validarApellido(control: AbstractControl): ValidationErrors | null {
    const nombreApellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
    const valid = nombreApellidoRegex.test(control.value);
    return valid ? null : { invalidNombreApellido: true }; 
  }

  export function validartitle(control: AbstractControl): ValidationErrors | null {
    const titleRegex = /^[a-zA-Z0-9\s]+$/; 
    const valid = titleRegex.test(control.value);
    return valid ? null : { invalidTitle: true }; 
  }

  export function validardescripcion(control: AbstractControl): ValidationErrors | null {
    const descripcionRegex = /^[a-zA-Z0-9\s]+$/; 
    const valid = descripcionRegex.test(control.value);
    return valid ? null : { invalidDescripcion: true }; 
  }

