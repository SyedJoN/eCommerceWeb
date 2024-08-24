import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Footer, Breadcrumbs } from './Components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const location = useLocation();

  // Check if it's the homepage
  const isHomePage = location.pathname === '/';

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        {isHomePage ? null : <Breadcrumbs />}
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <>Loading.....</>;
}

export default App;
