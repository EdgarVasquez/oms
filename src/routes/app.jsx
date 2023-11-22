import DashboardPage from "views/Dashboard/Dashboard.jsx";
import DashboardControl from "views/Dashboard/Dashboard-control.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import AsignacionChofer from "views/Flotas/AsignacionChofer/AsignacionChofer.jsx";
import Autobuses from "views/Flotas/Autobuses/Autobuses.jsx";
import Ruta from "views/RutasParadas/Rutas/Ruta.jsx";
import Parada from "views/RutasParadas/Paradas/Parada.jsx";
import ReporteDeficiencias from "views/Usuario/Deficiencias/Deficiencias.jsx";
import AsignacionHorario from "views/RutasParadas/AsignacionHorarios/AsignacionHorarios.jsx";
import Horario from "views/RutasParadas/Horarios/Horarios.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';
import Empleado from "../views/Flotas/Empleados/Empleados";
import Login from "../views/Login/Login";
import ReporteEmpleadosDia from "../views/Flotas/ReportesEmpleadoDia/ReporteEmpleadosDia";

const appRoutes = [
    {   path: "/dashboard", 
        sidebarName: "Dashboard", 
        navbarName: "Dashboard", 
        icon: Dashboard, 
        component: DashboardPage,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
 
    },
    {   path: "/control-dashboard", 
        sidebarName: "Dashboard Control", 
        navbarName: "Dashboard", 
        icon: Dashboard, 
        component: DashboardControl ,
        roles: [2], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/autobuses",
        sidebarName: "Autobuses",
        navbarName: "Autobuses",
        icon: Notifications,
        component: Autobuses,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
 
    },
    {
        path: "/empleados",
        sidebarName: "Empleados",
        navbarName: "Empleados",
        icon: Person,
        component: Empleado,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/rutas",
        sidebarName: "Rutas",
        navbarName: "Rutas",
        icon: LocationOn,
        component: Ruta,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/paradas",
        sidebarName: "Paradas",
        navbarName: "Paradas",
        icon: BubbleChart,
        component: Parada,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/deficiencias",
        sidebarName: "Deficiencias",
        navbarName: "Deficiencias",
        icon: LibraryBooks,
        component: ReporteDeficiencias,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/horarios",
        sidebarName: "Horarios",
        navbarName: "Horarios",
        icon: BubbleChart,
        component: Horario,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    {
        path: "/asignacionchofer",
        sidebarName: "Asignación Chofer",
        navbarName: "Asignación Chofer",
        icon: ContentPaste,
        component: AsignacionChofer
    },
    {
        path: "/asignacion-horarios",
        sidebarName: "Asignación Horarios",
        navbarName: "Asignación Horarios",
        icon: ContentPaste,
        component: AsignacionHorario
    },
    {
        path: "/reporte-dia",
        sidebarName: "Reporte de trabajo",
        navbarName: "Reporte de trabajo",
        icon: Person,
        component: ReporteEmpleadosDia,
        roles: [3], // Roles permitidos para esta ruta (1: admin, 2: user)
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
