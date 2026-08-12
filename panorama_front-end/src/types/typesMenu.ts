// types.ts
export type UserRole = 'ORGANIZADOR' | 'PARTICIPANTE' | 'JURADO' | 'ADMIN';

export interface MenuItem {
  label: string;
  path: string;
  icon?: string; // Opcional, caso use ícones
  allowedRoles: UserRole[]; // Quais roles podem ver este item
  children?: MenuItem[];
}

export interface User {
  name: string;
  role: UserRole;
}
