
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Welcome from "./pages/Welcome/Welcome";
import Celebrate from "./pages/Celebrate/Celebrate";
import Special from "./pages/Special/Special";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/celebrate"
            element={<Celebrate />}
          />

          <Route
            path="/special"
            element={<Special />}
          />

          <Route
            path="/friend"
            element={<Navigate to="/celebrate" replace />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
