import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {PrivateRoute, PublicRoute} from '../routes/helpers';
import ProtectedRoutes from '../routes/ProtectedRoutes';

const Login = lazy(() => import('../pages/Login'));


export function AppRoutes({isAuthenticated, role}) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PublicRoute path="/" isAuthenticated={isAuthenticated} role={role} exact>
            <Login/>
          </PublicRoute>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated} role={role} exact>
            <Login/>
          </PublicRoute>
          <PrivateRoute path="/" isAuthenticated={isAuthenticated} >
            <ProtectedRoutes/>
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
