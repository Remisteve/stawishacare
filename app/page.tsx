import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

// Auth Components
import AuthProvider from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Dashboard Components
import SuperAdminDashboard from '@/pages/superadmin/SuperAdminDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';
import PrepChampionDashboard from '@/pages/prep-champion/PrepChampionDashboard';
import PatientDashboard from '@/pages/patient/PatientDashboard';

// Layout Components
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import AdminLayout from '@/layouts/AdminLayout';
import DoctorLayout from '@/layouts/DoctorLayout';
import PrepChampionLayout from '@/layouts/PrepChampionLayout';
import PatientLayout from '@/layouts/PatientLayout';

// Public Pages
import LandingPage from '@/pages/public/LandingPage';
import PatientSelfRegister from '@/pages/public/PatientSelfRegister';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prep-pep-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/patient-register" element={<PatientSelfRegister />} />

              {/* SuperAdmin Routes */}
              <Route
                path="/superadmin/*"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <SuperAdminLayout>
                      <Routes>
                        <Route index element={<SuperAdminDashboard />} />
                        <Route path="hospitals" element={<div>Hospitals Management</div>} />
                        <Route path="users" element={<div>Users Management</div>} />
                        <Route path="analytics" element={<div>Analytics</div>} />
                        <Route path="settings" element={<div>Settings</div>} />
                      </Routes>
                    </SuperAdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout>
                      <Routes>
                        <Route index element={<AdminDashboard />} />
                        <Route path="staff" element={<div>Staff Management</div>} />
                        <Route path="patients" element={<div>Patients Management</div>} />
                        <Route path="appointments" element={<div>Appointments</div>} />
                        <Route path="analytics" element={<div>Hospital Analytics</div>} />
                        <Route path="requests" element={<div>Patient Requests</div>} />
                        <Route path="settings" element={<div>Hospital Settings</div>} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor/*"
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorLayout>
                      <Routes>
                        <Route index element={<DoctorDashboard />} />
                        <Route path="patients" element={<div>My Patients</div>} />
                        <Route path="appointments" element={<div>My Appointments</div>} />
                        <Route path="consultations" element={<div>Consultations</div>} />
                        <Route path="approvals" element={<div>Patient Approvals</div>} />
                        <Route path="reports" element={<div>Medical Reports</div>} />
                      </Routes>
                    </DoctorLayout>
                  </ProtectedRoute>
                }
              />

              {/* Prep Champion Routes */}
              <Route
                path="/prep-champion/*"
                element={
                  <ProtectedRoute allowedRoles={['prep_champion']}>
                    <PrepChampionLayout>
                      <Routes>
                        <Route index element={<PrepChampionDashboard />} />
                        <Route path="patients" element={<div>Supported Patients</div>} />
                        <Route path="education" element={<div>Education Materials</div>} />
                        <Route path="support" element={<div>Support Sessions</div>} />
                        <Route path="tracking" element={<div>Progress Tracking</div>} />
                      </Routes>
                    </PrepChampionLayout>
                  </ProtectedRoute>
                }
              />

              {/* Patient Routes */}
              <Route
                path="/patient/*"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientLayout>
                      <Routes>
                        <Route index element={<PatientDashboard />} />
                        <Route path="appointments" element={<div>My Appointments</div>} />
                        <Route path="medications" element={<div>My Medications</div>} />
                        <Route path="videos" element={<div>Video Uploads</div>} />
                        <Route path="requests" element={<div>My Requests</div>} />
                        <Route path="social" element={<div>Social Features</div>} />
                        <Route path="chat" element={<div>Messages</div>} />
                        <Route path="profile" element={<div>My Profile</div>} />
                      </Routes>
                    </PatientLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;