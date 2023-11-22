// BusStatsCard.js
import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import { StatsCard,ItemGrid,ChartCard } from 'components';
import { AccessTime, ContentCopy,InfoOutline, Update, Accessibility } from 'material-ui-icons';
import {
     Grid
} from 'material-ui';
import ChartistGraph from 'react-chartist';
import {
    dailySalesChart ,
    emailsSubscriptionChart,
    completedTasksChart
} from 'variables/charts';
const BusGrafics = () => {
 
    const [deficienciaCharts, setDeficienciaCharts] = useState({
        labels: [],
        series: [],
      });
      const [tiempoChart, settiempoChart] = useState({
        labels: [],
        series: [],
      });
      const [frequencyChart, setfrequencyChart] = useState({
        labels: [],
        series: [],
      });
    
    
      useEffect(() => {
        axios
          .get('https://omsappapi.azurewebsites.net/api/Dahboard/GetDeficienciaPorDia')
          .then(response => {
            const primeraColumna = [];
            const Series = [];
            for (let i = 0; i < response.data.dataList.length; i++) {
              const primeraCelda = response.data.dataList[i].diaAbreviatura;
              const serie = response.data.dataList[i].cantidadRegistros;
              primeraColumna.push(primeraCelda);
              Series.push(serie);
            }
    
            const data2 = {
              labels: primeraColumna,
              series: [Series], // Asegúrate de que series sea un array de arrays
            };
    
            console.log('Datos de la API:', data2);
            setDeficienciaCharts(data2);
          })
          .catch(error => {
            console.error('Error al obtener datos de la API', error);
          });
          axios
          .get('https://omsappapi.azurewebsites.net/api/Dahboard/GetCantidadPorHoraTermino')
          .then(response => {
            const primeraColumna1 = [];
            const Series1 = [];
            for (let i = 0; i < response.data.dataList.length; i++) {
              const primeraCelda = response.data.dataList[i].assignmentFinishTime;
              const serie = response.data.dataList[i].cantidadRegistros;
              primeraColumna1.push(primeraCelda);
              Series1.push(serie);
            }
    
            const dataGetCantidadPorHoraTermino = {
              labels: primeraColumna1,
              series: [Series1], // Asegúrate de que series sea un array de arrays
            };
    
            console.log('Datos de la API:', dataGetCantidadPorHoraTermino);
            settiempoChart(dataGetCantidadPorHoraTermino);
          })
          .catch(error => {
            console.error('Error al obtener datos de la API', error);
          });
          axios
          .get('https://omsappapi.azurewebsites.net/api/Dahboard/GetFrecuencyWorkingDay')
          .then(response => {
            const primeraColumna1 = [];
            const Series1 = [];
            for (let i = 0; i < response.data.dataList.length; i++) {
              const primeraCelda = response.data.dataList[i].hourOfDay;
              const serie = response.data.dataList[i].frequency;
              primeraColumna1.push(primeraCelda);
              Series1.push(serie);
            }
    
            const dataGetCantidadPorHoraTermino = {
              labels: primeraColumna1,
              series: [Series1], // Asegúrate de que series sea un array de arrays
            };
    
            console.log('Datos de la API:', dataGetCantidadPorHoraTermino);
            setfrequencyChart(dataGetCantidadPorHoraTermino);
          })
          .catch(error => {
            console.error('Error al obtener datos de la API', error);
          });
      }, []);
      useEffect(() => {
        console.log("datas actualizado", deficienciaCharts);
      }, [deficienciaCharts]);

    return (
        <Grid container>
        <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
                chart={
                    <ChartistGraph
                        className="ct-chart"
                        data={deficienciaCharts}
                        type="Line"
                        options={dailySalesChart.options}
                        listener={
                            dailySalesChart.animation
                        }
                    />
                }
                chartColor="omsappGreen"
                title="Incidentes Por Día"
                text={
                    <span>
                       Indicentes y sugerencias recibidos.
                    </span>
                }
                statIcon={AccessTime}
                statText="Recién actualizado"
            />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
                chart={
                    <ChartistGraph
                        className="ct-chart"
                        data={tiempoChart}
                        type="Bar"
                        options={emailsSubscriptionChart.options}
                        responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                        listener={
                            emailsSubscriptionChart.animation
                        }
                    />
                }
                chartColor="blueSky"
                title="Cantidad por hora de termino"
                text="Evaluación de termino de turnos"
                statIcon={AccessTime}
                statText="Recién actualizado"
            />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
                chart={
                    <ChartistGraph
                        className="ct-chart"
                        data={frequencyChart}
                        type="Line"
                        options={completedTasksChart.options}
                        listener={
                            completedTasksChart.animation
                        }
                    />
                }
                chartColor="blueGreen"
                title="Autobuses en funcionamiento"
                text="Autobuses funcionamiento VS flota total"
                statIcon={AccessTime}
                statText="Recién actualizado"
            />
        </ItemGrid>
   
  
       
    </Grid>
            
            
    );
};

export default BusGrafics;
