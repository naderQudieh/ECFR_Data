import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function ParentLayout() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <Header />
            <main className="p-8 pb-16" style={{ padding: '2rem', paddingBottom: '4rem' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}