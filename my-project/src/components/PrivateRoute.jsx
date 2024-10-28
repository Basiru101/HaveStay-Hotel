// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   if (!currentUser) {
//     return <Navigate to="/sign-in" />;
//   }
//   const isAdmin = currentUser.role === 'admin';
//   return isAdmin ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;


// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);
//   return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
// }
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // If user is not logged in, redirect to sign-in
  if (!currentUser) {
    return <Navigate to='/sign-in' />;
  }

  return <Outlet />;
}
