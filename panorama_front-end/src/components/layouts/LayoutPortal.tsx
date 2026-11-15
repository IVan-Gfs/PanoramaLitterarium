import { Sidebar } from '../menu/sideBarMenu';
import { Outlet } from 'react-router-dom';

import '../../assets/css/portal.css';
import BreadcrumbPortal from './BreadCrumbPortal';

function LayoutPortal() {
    return (
        <div className="portal-layout-container">

            <Sidebar />

            <main className="portal-main-content">

                <BreadcrumbPortal />

                <div className="portal-page-content">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default LayoutPortal;