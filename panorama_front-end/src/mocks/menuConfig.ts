// menuConfig.ts
import { type MenuItem } from '../types/typesMenu';

export const sidebarMenuConfig: MenuItem[] = [
  {
    label: 'Visão geral',
    path: '/portal/visao-geral',
    icon: 'home',
    allowedRoles: ['ADMIN', 'ORGANIZADOR', 'PARTICIPANTE', 'JURADO'],
  },
  {
    label: 'Concursos',
    path: '/portal/concursos',
    icon: 'trophy',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
    children: [
      { label: 'Publicar', path: '/portal/concursos/publicar', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
      { label: 'Listagem', path: '/portal/concursos/listagem', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
    ]
  },
  {
    label: 'Biblioteca',
    path: '/portal/biblioteca',
    icon: 'book-open',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
    children: [
      { label: 'Critérios Avaliativos', path: '/portal/biblioteca/criterios', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
      { label: 'Modelos de inscrição', path: '/portal/biblioteca/modelos', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
    ]
  },
  {
    label: 'Talentos',
    path: '/portal/talentos',
    icon: 'user-badge',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
    children: [
      { label: 'Banco de autores', path: '/portal/talentos/autores', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
      { label: 'Destaques', path: '/portal/talentos/destaques', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
      { label: 'Convites', path: '/portal/talentos/convites', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
      { label: 'Histórico', path: '/portal/talentos/historico', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
    ]
  },
  {
    label: 'Resultados',
    path: '/portal/resultados',
    icon: 'chart-bar',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
  },
  {
    label: 'Financeiro',
    path: '/portal/financeiro',
    icon: 'wallet',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
  },
  {
    label: 'Comunicação',
    path: '/portal/comunicacao',
    icon: 'message',
    allowedRoles: ['ADMIN', 'ORGANIZADOR'],
  },
  {
    label: 'Minhas Inscrições',
    path: '/portal/inscricoes',
    icon: 'clipboard',
    allowedRoles: ['PARTICIPANTE'], 
  },
  {
    label: 'Explorar',
    path: '/portal/explorar',
    icon: 'compass',
    allowedRoles: ['PARTICIPANTE'],
  },
  {
    label: 'Minhas Obras',
    path: '/portal/obras',
    icon: 'book',
    allowedRoles: ['PARTICIPANTE'],
  },
  {
    label: 'Avaliações',
    path: '/portal/avaliacoes',
    icon: 'award',
    allowedRoles: ['JURADO'],
  },
  {
    label: 'Perfil',
    path: '/portal/perfil',
    icon: 'user',
    allowedRoles: ['ADMIN', 'ORGANIZADOR', 'PARTICIPANTE', 'JURADO'],
  },
  {
    label: 'Configurações',
    path: '/portal/configuracoes',
    icon: 'settings',
    allowedRoles: ['ADMIN', 'ORGANIZADOR', 'JURADO'],
  },
];
