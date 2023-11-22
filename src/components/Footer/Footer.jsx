import React from 'react';
import PropTypes from 'prop-types';
import {
    List, ListItem, withStyles
} from 'material-ui';

import { footerStyle } from 'variables/styles';

class Footer extends React.Component{
    render(){
        const { classes } = this.props;
        return (
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <p className={classes.right}>
                        <span>
                            &copy; {1900 + (new Date()).getYear()} <a href="#" className={classes.a}>OMSAPP</a>, Cambiando el transporte público para un futuro más 
eficiente.

                        </span>
                    </p>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
