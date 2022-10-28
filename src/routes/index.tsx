import { Routes as Switch, Route } from 'react-router-dom'
import { Protect, NotFound, Home } from '../pages'

/*
 * Application Routes
 */
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/protect" element={<Protect />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  )
}

export default Routes
