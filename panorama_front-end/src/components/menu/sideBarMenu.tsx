// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { sidebarMenuConfig } from '../../mocks/menuConfig';
import { type MenuItem } from '../../types/typesMenu';

// Importação de ícones correspondentes à imagem (instale lucide-react)
import { 
  LayoutDashboard, Trophy, BookOpen, Contact2, 
  BarChart3, Wallet, Mail, Settings, ChevronDown, 
  Compass,
  Clipboard,
  Book,
  UserCircle,
  LogOutIcon
} from 'lucide-react';
import '../../assets/css/menu/sideBar.css';
import { useAuth } from "../../contexts/AuthContext";



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

export const Sidebar: React.FC = () => {
  // Guarda o estado de quais menus suspensos estão abertos usando o label/path como chave

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User from AuthContext:", user?.email); // Para depuração

  const userRole = user?.role || 'PARTICIPANTE';

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/user/login');
  }

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
      {profileItem && (
        <div className="sidebar-footer">
          <NavLink 
            to={profileItem.path} 
            className={({ isActive }) => `menu-link footer-link ${isActive ? 'active' : ''}`}
          >
            {renderIcon(profileItem.icon)}
            <span>{profileItem.label}</span>
          </NavLink>
        </div>
      )}
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

      <button className='menu-link footer-link logout' onClick={handleLogout}><LogOutIcon size={20}/>Sair</button>
    </nav>
  );
};
