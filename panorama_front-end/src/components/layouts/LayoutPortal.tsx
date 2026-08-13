


import React, { useState } from 'react';
import { Sidebar } from '../menu/sideBarMenu';
import { type User, type UserRole } from '../../types/typesMenu';
import { Outlet } from 'react-router-dom';
import '../../assets/css/portal.css';
function LayoutPortal() {

  // Simulação de estado de autenticação
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'Amanda Costa',
    role: 'PARTICIPANTE', 
  });

  // Função apenas para você testar mudando as roles em tempo de execução
  const alternarRole = (role: UserRole) => {
    setCurrentUser({ ...currentUser, role });
  };

  return (
    <div className="portal-layout-container">
      <Sidebar userRole={currentUser.role} />
      
      <main className="portal-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutPortal;

