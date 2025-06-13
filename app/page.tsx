"use client"

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import AuthProvider from '@/contexts/AuthContext';
import AppRouter from '@/components/AppRouter';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="prep-pep-theme">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;