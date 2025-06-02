import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

import ShipList from './components/Ships/ShipList';
import ShipForm from './components/Ships/ShipForm';
import ShipProfile from './components/Ships/ShipProfile';

import ShipComponentList from './components/Components/ComponentList';
import ShipComponentForm from './components/Components/ComponentForm';
import ShipComponentProfile from './components/Components/ComponentProfile';

import JobList from './components/MaintenanceJobs/JobList';
import JobForm from './components/MaintenanceJobs/JobForm';

import MaintenanceCalendar from './components/MaintenanceCalendar/MaintenanceCalendar';

import NotificationCenter from './components/NotificationCenter/NotificationCenter';

import KPIsDashboard from './components/KPIsDashboard/KPIsDashboard';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/ships" element={
          <ProtectedRoute>
            <ShipList />
          </ProtectedRoute>
        } />
        <Route path="/ships/new" element={
          <ProtectedRoute>
            <ShipForm />
          </ProtectedRoute>
        } />
        <Route path="/ships/edit/:imoNumber" element={
          <ProtectedRoute>
            <ShipForm />
          </ProtectedRoute>
        } />
        <Route path="/ships/:imoNumber" element={
          <ProtectedRoute>
            <ShipProfile />
          </ProtectedRoute>
        } />

        <Route path="/ship-components" element={
          <ProtectedRoute>
            <ShipComponentList />
          </ProtectedRoute>
        } />
        <Route path="/ship-components/new" element={
          <ProtectedRoute>
            <ShipComponentForm />
          </ProtectedRoute>
        } />
        <Route path="/ship-components/edit/:serialNumber" element={
          <ProtectedRoute>
            <ShipComponentForm />
          </ProtectedRoute>
        } />
        <Route path="/ship-components/:serialNumber" element={
          <ProtectedRoute>
            <ShipComponentProfile />
          </ProtectedRoute>
        } />

        <Route path="/maintenance-jobs" element={
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        } />
        <Route path="/maintenance-jobs/new" element={
          <ProtectedRoute>
            <JobForm />
          </ProtectedRoute>
        } />
        <Route path="/maintenance-jobs/edit/:jobId" element={
          <ProtectedRoute>
            <JobForm />
          </ProtectedRoute>
        } />

        <Route path="/maintenance-calendar" element={
          <ProtectedRoute>
            <MaintenanceCalendar />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        } />

        <Route path="/kpis" element={
          <ProtectedRoute>
            <KPIsDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
