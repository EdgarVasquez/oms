import React, { useState, useEffect } from 'react';
import Chat from '../../AppbControl.js'; // Ajusta la ruta según la ubicación real de AppB.js
import {
    withStyles, Grid
} from 'material-ui';

import PropTypes from 'prop-types';
// react plugin for creating charts

import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid
} from 'components';



import { dashboardStyle } from 'variables/styles';

import BusStatsCard from '../../services/ControlDashboardTotalsService.js';  // Asegúrate de ajustar la ruta según tu estructura de carpetas

class DashboardControl extends React.Component{

    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render(){
        return (
            <div>
                  <BusStatsCard />
                  <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
                headerColor="blueGreen"
                cardTitle="MAPA"
                cardSubtitle="Autobuses en funcionamiento"
               content={  
                <Chat />
                }
            />
        </ItemGrid>
              
            </div>
        );
    }
}

DashboardControl.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(DashboardControl);
