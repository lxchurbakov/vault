import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import DashboardPage from './dashboard/pages/DashboardPage'

export default function App() {
 return (
   <BrowserRouter>
     <Switch>
       <Route path="/">
         <DashboardPage />
       </Route>
     </Switch>
   </BrowserRouter>
 );
}
