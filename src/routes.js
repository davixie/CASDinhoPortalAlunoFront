import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {PrivateRouteAdm, PrivateRouteStudent} from './pages/PrivateRoutes'

import Login from './pages/Login/index';
import Boletim from './pages/Profile/Boletim/index';
import Home from './pages/Profile/Home/index';
import Faltas from './pages/Profile/Faltas/index';
import Casdindin from './pages/Profile/Casdindin/index';

import Header_Page from './pages/ADM/Home';
import SetBoletim from './pages/ADM/Boletim';
import SetCasdindin from './pages/ADM/Eventos';
import SetFaltas from './pages/ADM/Faltas';
import NovoEstudante from './pages/ADM/NovoEstudante';
import NovoAdm from './pages/ADM/NovoAdm';
import Lista from './pages/ADM/ListaAlunos';

import Frida from './pages/ADM/ListaAlunos/Frida';
import Mandela from './pages/ADM/ListaAlunos/Mandela';
import Turing from './pages/ADM/ListaAlunos/Turing';
import Malala from './pages/ADM/ListaAlunos/Malala';
import Alunos from './pages/ADM/ListaAlunos/TodosAlunos';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRouteStudent path="/profile" exact component={Home} />
                <PrivateRouteStudent path="/profile/boletim" component={Boletim} />
                <PrivateRouteStudent path="/profile/faltas" component={Faltas} />
                <PrivateRouteStudent path="/profile/casdindin" component={Casdindin} />

                <PrivateRouteAdm path="/adm" exact component={Header_Page} />
                <PrivateRouteAdm path="/adm/boletim" component={SetBoletim} />
                <PrivateRouteAdm path="/adm/eventos" component={SetCasdindin} />
                <PrivateRouteAdm path="/adm/faltas" component={SetFaltas} />
                <PrivateRouteAdm path="/adm/novoestudante" component={NovoEstudante} />
                <PrivateRouteAdm path="/adm/novoadm" component={NovoAdm} />
                
                <PrivateRouteAdm path="/adm/lista" exact component={Lista} />
                <PrivateRouteAdm path="/adm/lista/frida" component={Frida} />
                <PrivateRouteAdm path="/adm/lista/mandela" component={Mandela} />
                <PrivateRouteAdm path="/adm/lista/turing" component={Turing} />
                <PrivateRouteAdm path="/adm/lista/malala" component={Malala} />
                <PrivateRouteAdm path="/adm/lista/alunos" component={Alunos} />

            </Switch>
        </BrowserRouter>
    );
}