// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { sidebarMenuConfig } from '../../mocks/menuConfig';
import { type MenuItem, type UserRole } from '../../types/typesMenu';

// Importação de ícones correspondentes à imagem (instale lucide-react)
import { 
  LayoutDashboard, Trophy, BookOpen, Contact2, 
  BarChart3, Wallet, Mail, Settings, ChevronDown, 
  Compass,
  Clipboard,
  Book,
  UserCircle
} from 'lucide-react';
import '../../assets/css/menu/sideBar.css';

interface SidebarProps {
  userRole: UserRole;
}

// Helper para renderizar dinamicamente os ícones mapeados na config
const renderIcon = (iconName?: string) => {
  switch (iconName) {
    case 'home': return <LayoutDashboard size={20} />;
    case 'user': return <UserCircle size={20} />;
    case 'trophy': return <Trophy size={20} />;
    case 'book-open': return <BookOpen size={20} />;
    case 'user-badge': return <Contact2 size={20} />;
    case 'chart-bar': return <BarChart3 size={20} />;
    case 'wallet': return <Wallet size={20} />;
    case 'message': return <Mail size={20} />;
    case 'settings': return <Settings size={20} />;
    case 'compass': return <Compass size={20} />;
    case 'clipboard': return <Clipboard size={20} />;
    case 'book': return <Book size={20} />;

    
    default: return null;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  // Guarda o estado de quais menus suspensos estão abertos usando o label/path como chave
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Filtra itens com base na role do usuário autenticado
  const allowedItems = sidebarMenuConfig.filter(item => item.allowedRoles.includes(userRole));

  // Separa o item fixo de 'Configurações' do topo para fixá-lo no rodapé (conforme o design)

  const settingsItem = allowedItems.find(item => item.path === '/portal/configuracoes');
  const profileItem = allowedItems.find(item => item.path === '/portal/perfil');
  const mainItems = allowedItems.filter(item => item.path !== '/portal/perfil' && item.path !== '/portal/configuracoes');

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = !!openDropdowns[item.label];

    if (hasChildren) {
      return (
        <li key={item.path} className="menu-group">
          <div 
            className={`menu-trigger ${isDropdownOpen ? 'active-trigger' : ''}`}
            onClick={() => toggleDropdown(item.label)}
          >
            <div className="trigger-content">
              {renderIcon(item.icon)}
              <span>{item.label}</span>
            </div>
            <ChevronDown size={16} className={`arrow-icon ${isDropdownOpen ? 'rotated' : ''}`} />
          </div>
          
          {/* Submenu renderizado quando aberto */}
          <ul className={`submenu ${isDropdownOpen ? 'submenu-open' : ''}`}>
            {item.children!.map(child => (
              <li key={child.path}>
                <NavLink 
                  to={child.path}
                  className={({ isActive }) => `submenu-link ${isActive ? 'sub-active' : ''}`}
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.path}>
        <NavLink 
          to={item.path} 
          className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
        >
          {renderIcon(item.icon)}
          <span>{item.label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <nav className="sidebar-container">
      {/* Cabeçalho com a Logo */}
      <div className="sidebar-header">
        <div className="logo-placeholder">
          {/* Substitua pelo seu componente <img src={logo} alt="Logo" /> */}
          <Link to="/portal/visao-geral">
                    <img src="/logo.svg" alt="logo" className="logo" />
          </Link>
        </div>
      </div>

      {/* Lista Principal de Navegação */}
      <ul className="sidebar-menu">
        {mainItems.map(item => renderMenuItem(item))}
      </ul>

      {/* Rodapé fixado para o botão de Configurações */}
      {settingsItem && (
        <div className="sidebar-footer">
          <NavLink 
            to={settingsItem.path} 
            className={({ isActive }) => `menu-link footer-link ${isActive ? 'active' : ''}`}
          >
            {renderIcon(settingsItem.icon)}
            <span>{settingsItem.label}</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
};
