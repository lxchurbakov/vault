import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

import DashboardPage from './dashboard/pages/DashboardPage'

import dashboardStore from './dashboard/store'

// import history from '@/libs/history';
// import exampleStore from './domains/example/store';

// const ExamplePage = React.lazy(() => import('@/domains/example/pages/ExamplePage'));

export default function App() {
 return (
   <Provider {...{ dashboardStore }}>
     <BrowserRouter>
       <Switch>
         <Route path="/">
           <DashboardPage />
         </Route>
       </Switch>
     </BrowserRouter>
   </Provider>
 );
}
