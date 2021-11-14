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
import SetMensagensAdmin from './pages/ADM/Mensagens';
import SetEventosAdmin from './pages/ADM/Calendar';
import NovoEstudante from './pages/ADM/NovoEstudante';
import NovoAdm from './pages/ADM/NovoAdm';
import Lista from './pages/ADM/ListaAlunos';

import Frida from './pages/ADM/ListaAlunos/Frida';
import Mandela from './pages/ADM/ListaAlunos/Mandela';
import Turing from './pages/ADM/ListaAlunos/Turing';
import Malala from './pages/ADM/ListaAlunos/Malala';
import Alunos from './pages/ADM/ListaAlunos/TodosAlunos';

import error404 from './pages/error/index'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" exact component={Login} />
                <PrivateRouteStudent exact path="/profile" exact component={Home} />
                <PrivateRouteStudent exact path="/profile/boletim" component={Boletim} />
                <PrivateRouteStudent exact path="/profile/faltas" component={Faltas} />
                <PrivateRouteStudent exact path="/profile/casdindin" component={Casdindin} />

                <PrivateRouteAdm exact path="/adm" exact component={Header_Page} />
                <PrivateRouteAdm exact path="/adm/boletim" component={SetBoletim} />
                <PrivateRouteAdm exact path="/adm/mensagens" component={SetMensagensAdmin} />
                <PrivateRouteAdm exact path="/adm/calendar" component={SetEventosAdmin} />
                <PrivateRouteAdm exact path="/adm/novoestudante" component={NovoEstudante} />
                <PrivateRouteAdm exact path="/adm/novoadm" component={NovoAdm} />
                
                <PrivateRouteAdm exact path="/adm/lista" exact component={Lista} />
                <PrivateRouteAdm exact path="/adm/lista/frida" component={Frida} />
                <PrivateRouteAdm exact path="/adm/lista/mandela" component={Mandela} />
                <PrivateRouteAdm exact path="/adm/lista/turing" component={Turing} />
                <PrivateRouteAdm exact path="/adm/lista/malala" component={Malala} />
                <PrivateRouteAdm exact path="/adm/lista/alunos" component={Alunos} />
                <Route component={error404}/>
            </Switch>
        </BrowserRouter>
    );
}