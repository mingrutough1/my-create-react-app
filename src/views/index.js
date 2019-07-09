import React from 'react';

import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import Login from '@/views/login';
import Layout from './layout';

function App() {
  return (
    <BrowserRouter>
        <Switch>                                                                                                 
            <Route path="/login" exact component={Login}></Route>     
            <Route component={Layout}></Route>                                                                                               
        </Switch>  
    </BrowserRouter>
  );
}

export default App;
