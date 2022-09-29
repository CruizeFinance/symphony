import { lazy, Suspense } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { Loader } from '../components'
import { Home, NotFound } from '../pages'

// lazy importing protect page
const Protect = lazy(() => import('../pages/protect'))

/*
 * Application Routes
 */
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      {/* setting a fallback loader in case the component isn't loaded */}
      <Route
        path="/protect"
        element={
          <Suspense fallback={<Loader />}>
            <Protect />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Switch>
  )
}

export default Routes
