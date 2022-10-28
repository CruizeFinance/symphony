import { Routes as Switch, Route } from 'react-router-dom'
import { Protect, NotFound } from '../pages'
import Graph from '../pages/groph'

/*
 * Application Routes
 */
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Protect />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  )
}

export default Routes
