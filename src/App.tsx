import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import Dashboard from '@/features/dashboard/Dashboard';
import Profile from '@/features/profile/Profile';
import Tracker from '@/features/tracker/Tracker';
import Coach from '@/features/coach/Coach';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="coach" element={<Coach />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
