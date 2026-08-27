
import { Sidebar } from '../menu/sideBarMenu';
import { Outlet } from 'react-router-dom';
import '../../assets/css/portal.css';

function LayoutPortal() {
  return (
    <div className="portal-layout-container">
      <Sidebar />

      <main className="portal-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutPortal;

