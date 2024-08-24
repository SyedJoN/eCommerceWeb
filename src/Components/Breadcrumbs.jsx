import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="relative w-full h-64 bg-cover">
      <img src="public/images/cover.jpg" alt="" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full text-center text-white">
        {pathnames.length > 0 && (
          <h1 className="text-5xl font-bold capitalize">{pathnames[pathnames.length - 1]}</h1>
        )}
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Link to="/" className="text-white">Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <span key={name} className="text-white">
                <span> / </span>
                {isLast ? (
                  <span className="text-white">{name}</span>
                ) : (
                  <Link to={routeTo} className="text-white">{name}</Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
