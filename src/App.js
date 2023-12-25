import UserComponent from './component/User/user';
import { BrowserRouter,Route, Routes} from "react-router-dom";
import UserProfile from './component/UserProfile/userProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/"  element={<UserComponent />} />
          <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
