import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import TodoListPage from './pages/TodoListPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

import AuthContext from './store/AuthContext';

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <IndexPage />
                </Route>
                <Route path="/signup">
                    {authCtx.isLoggedIn && <Redirect to="/" />}
                    {!authCtx.isLoggedIn && <SignupPage />}
                </Route>
                <Route path="/login">
                    {authCtx.isLoggedIn && <Redirect to="/" />}
                    {!authCtx.isLoggedIn && <LoginPage />}
                </Route>
                <Route path="/profile">
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                    {authCtx.isLoggedIn && <ProfilePage />}
                </Route>
                <Route path="/todolist">
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                    {authCtx.isLoggedIn && <TodoListPage />}
                </Route>
                <Route path="/changepassword">
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                    {authCtx.isLoggedIn && <ChangePasswordPage />}
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;

