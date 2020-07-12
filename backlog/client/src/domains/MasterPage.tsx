import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import DashboardPage from './dashboard/pages/DashboardPage'

import dashboardStore from './dashboard/store'

export default () => (
 <Provider {...{ dashboardStore }}>
   <BrowserRouter>
     <Switch>
       <Route path="/">
         <DashboardPage />
       </Route>
     </Switch>
   </BrowserRouter>
 </Provider>
)
