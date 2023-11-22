// BusStatsCard.js
import React, { useState, useEffect,useContext } from 'react';
import axios from '../http-common';
import { StatsCard,ItemGrid } from 'components';
import { AccessTime, ContentCopy,InfoOutline, Update, Accessibility } from 'material-ui-icons';
import {
     Grid
} from 'material-ui';
import { UserContext } from "../usercontext";

const BusStatsCard = () => {
    const { user } = useContext(UserContext); // Accede a las propiedades del contexto
    const [buses, setBuses] = useState(25);
    const [Choferes, setChoferes] = useState(25);
    const [Rutas, setRutas] = useState(25);
    const [Incidentes, setIncidentes] = useState(25);

    useEffect(() => {
        console.log(user)
        axios.get('https://omsappapi.azurewebsites.net/api/Dahboard/GetTotals')
            .then(response => {
                const busesValue = response.data.dataList[0].buses;
                setBuses(busesValue);
                const choferesValue = response.data.dataList[0].choferes;
                setChoferes(choferesValue);
                const reportesValue = response.data.dataList[0].reportes;
                setIncidentes(reportesValue);
                const rutasValue = response.data.dataList[0].rutas;
                setRutas(rutasValue);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API', error);
            });
    }, []);

    return (
        <Grid container>
        <ItemGrid xs={12} sm={6} md={3}>
        <StatsCard
            icon={ContentCopy}
            iconColor="blueSky"
            title="Buses"
            description={buses}
            statIcon={AccessTime}
            statText="Recién actualizado"
        />
            </ItemGrid>
            <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={Accessibility}
                            iconColor="blueGreen"
                            title="Choferes"
                            description={Choferes}
                            statIcon={AccessTime}
                            statText="Recién actualizado"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="omsappGreen"
                            title="Rutas"
                            description={Rutas}
                            statIcon={AccessTime}
                            statText="Recién actualizado"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="lightGreen"
                            title="Incidentes"
                            description={Incidentes}
                            statIcon={Update}
                            statText="Recién actualizado"
                        />
                    </ItemGrid>
            </Grid>
            
            
    );
};

export default BusStatsCard;
