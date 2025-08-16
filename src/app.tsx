import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso"
import Index from "./pages"
import Game from "./pages/game.tsx"
import Time from "./pages/topics/time.tsx"

function Topics() {
  return (
    <div class="m-auto max-w-2xl">
      <Router>
        <Route path="time" component={Time} />
        <></>
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
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
