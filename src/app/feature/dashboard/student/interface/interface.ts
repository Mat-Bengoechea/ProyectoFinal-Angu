export interface Student {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  curso: 'Angular' | 'React' | 'Vue' | 'Svelte' | 'Ember';
}
