// BusStatsCard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from '../http-common';
import { StatsCard,ItemGrid } from 'components';
import { AccessTime, ContentCopy,InfoOutline, Update, Accessibility } from 'material-ui-icons';
import {
     Grid
} from 'material-ui';
import { UserContext } from "../usercontext";
import { encryptData, decryptData } from './Criptography'
const BusStatsCard = () => {
    const [buses, setBuses] = useState(25);
    const [Choferes, setChoferes] = useState(25);
    const { user, user2 } = useContext(UserContext); // Accede a las propiedades del contexto
    console.log("datos ",decryptData(user2.routeId))
    useEffect(() => {
        axios.get(`https://omsappapi.azurewebsites.net/api/Dahboard/GetTotalsControl?IdRuta=${decryptData(user2.routeId)}`)
        .then(response => {
                const busesValue = response.data.dataList[0].autobuses;
                setBuses(busesValue);
                const choferesValue = response.data.dataList[0].choferes;
                setChoferes(choferesValue);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API', error);
            });
    }, []);

    return (
        <Grid container>
                <ItemGrid xs={12} sm={6}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="omsappGreen"
                            title="Autobuses en ruta"
                            description={buses}
                            statIcon={AccessTime}
                            statText="Recién actualizado"
                        />
                </ItemGrid>
                <ItemGrid xs={12} sm={6}>
                        <StatsCard
                            icon={Accessibility}
                            iconColor="blueGreen"
                            title="Choferes en ruta"
                            description={Choferes}
                            statIcon={AccessTime}
                            statText="Recién actualizado"
                        />
                    </ItemGrid>
            </Grid>
            
            
    );
};

export default BusStatsCard;
