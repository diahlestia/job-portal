import { ReactLocation, Router } from '@tanstack/react-location';
import LoginPage from './pages/LoginPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';

const location = new ReactLocation();

function App() {
  return (
    <Router location={location} routes={[
      { path: "/", element: <LoginPage /> },
      { 
        path: "/jobs", 
        element: <JobListPage />,
      },
      {
        path: '/jobss/:id',
        element: <JobDetailPage />,
    },
    ]} />
  );
}

export default App;
