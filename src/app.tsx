import {
  lazy,
  ErrorBoundary,
  LocationProvider,
  Route,
  Router,
} from "preact-iso"
import Index from "./pages"

const Game = lazy(() => import("./pages/game"))
const Time = lazy(() => import("./pages/topics/time"))
const NotFound = lazy(() => import("./pages/not-found"))

function Topics() {
  return (
    <div class="m-auto max-w-2xl">
      <Router>
        <Route path="time" component={Time} />
        <NotFound default />
      </Router>
    </div>
  )
}

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Index} />
          <Route path="/game" component={Game} />
          <Route path="/topics/*" component={Topics}></Route>
          <NotFound default />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
