import { Routes, Route } from 'react-router-dom';
import { Signin, Signup } from './components'; 
import ProtectedRoutes from './utils/ProtectedRoutes';
import { FeedsPage, PeoplePage, ProfilePage } from './pages';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/feeds" element={<FeedsPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;