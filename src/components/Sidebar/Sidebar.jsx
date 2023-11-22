import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { NavLink, withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'; // Importa el icono de cerrar sesión

import { sidebarStyle } from 'variables/styles';

import { HeaderLinks } from 'components';
import { UserContext } from "../../usercontext";

const Sidebar = (props) => {
    const { classes, color, logo, image, logoText, routes, location } = props;
    const { logout, user } = useContext(UserContext);
    const userRoleId = user ? user.rolId : null;

    // Verifica si routeName es la ruta activa (en la barra de direcciones del navegador)
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? true : false;
    };
    const filteredRoutes = routes.filter((prop) => {
        // Si la ruta no tiene roles especificados, siempre la mostramos
        if (!prop.roles) return true;

        // Mostrar la ruta solo si el rol del usuario coincide con los roles permitidos
        return prop.roles.includes(userRoleId);
    });
    // Maneja el cierre de sesión
    const handleLogout = () => {
        logout();
        window.location.reload();
        console.log("Cerrar sesión");
        // Implementa la lógica para cerrar la sesión según las necesidades de tu aplicación.
        // Aquí puedes redirigir al usuario a la página de inicio de sesión, eliminar cookies, etc.
    };

    const links = (
        <List className={classes.list}>
            {filteredRoutes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                    <NavLink to={prop.path} className={classes.item} activeClassName="active" key={key}>
                        <ListItem button className={classes.itemLink + (activeRoute(prop.path) ? " " + classes[color] : "")}>
                            <ListItemIcon className={classes.itemIcon + (activeRoute(prop.path) ? " " + classes.whiteFont : "")}>
                                <prop.icon />
                            </ListItemIcon>
                            <ListItemText primary={prop.sidebarName} className={classes.itemText + (activeRoute(prop.path) ? " " + classes.whiteFont : "")} disableTypography={true} />
                        </ListItem>
                    </NavLink>
                );
            })}
            {/* Agrega el botón de cerrar sesión */}
            <ListItem button onClick={handleLogout} className={classes.itemLink}>
                <ListItemIcon className={classes.itemIcon}>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" className={classes.itemText} disableTypography={true} />
            </ListItem>
        </List>
    );
    

    const brand = (
        <div className={classes.logo}>
            <a href="#" className={classes.logoLink}>
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                {logoText}
            </a>
        </div>
    );

    return (
        <div>
            <Hidden mdUp>
                <Drawer
                    type="temporary"
                    anchor='right'
                    open={props.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Mejora el rendimiento de apertura en dispositivos móviles.
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        <HeaderLinks />
                        {links}
                    </div>
                    {image !== undefined ? <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} /> : null}
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    anchor='left'
                    type="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    {image !== undefined ? <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} /> : null}
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    image: PropTypes.string,
    logoText: PropTypes.string.isRequired,
    routes: PropTypes.array.isRequired,
};

export default withStyles(sidebarStyle, { withTheme: true })(withRouter(Sidebar));
