import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso"
import Index from "./pages"
import Game from "./pages/game.tsx"

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Index} />
          <Route path="/game" component={Game} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
