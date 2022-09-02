import { Routes as Switch, Route } from 'react-router-dom'
import { Home, Protect } from '../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/protect" element={<Protect />} />
    </Switch>
  )
}

export default Routes
