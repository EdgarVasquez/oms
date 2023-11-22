import App from 'containers/App/App.jsx';
import Login from '../views/Login/Login';
const indexRoutes = [
    { path: "/", component: App },
    { path: "/logout", component: Login }
];

export default indexRoutes;
