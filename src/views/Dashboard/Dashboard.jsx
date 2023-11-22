import React, { useState, useEffect } from 'react';
import axios from '../../http-common'
import Chat from '../../appb.js'; // Ajusta la ruta según la ubicación real de AppB.js
import {
    withStyles, Grid
} from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';

import PropTypes from 'prop-types';
// react plugin for creating charts

import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid
} from 'components';



import { dashboardStyle } from 'variables/styles';
import Maps from '../Maps/Maps';
import BusStatsCard from '../../services/DashboardTotalsService';  // Asegúrate de ajustar la ruta según tu estructura de carpetas
import BusGrafics from '../../services/DashboardGraphics';  // Asegúrate de ajustar la ruta según tu estructura de carpetas

class Dashboard extends React.Component{

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
                  <BusGrafics />
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

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
