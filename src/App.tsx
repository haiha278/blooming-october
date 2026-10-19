
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Welcome from "./pages/Welcome/Welcome";
// import Friend from "./pages/Friend/Friend";
import Special from "./pages/Special/Special";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/friend" element={<Friend />} /> */}
          <Route path="/special" element={<Special />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
