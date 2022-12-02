import { Routes as Switch, Route } from 'react-router-dom'
import { Protect, NotFound } from '../pages'

/*
 * Application Routes
 */
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Protect />} />
      {/* <Route path="/protect" element={<Protect />} /> */}
      <Route path="*" element={<NotFound />} />
    </Switch>
  )
}

export default Routes
