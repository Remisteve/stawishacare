import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff Login - PrEP/PEP Care',
  description: 'Healthcare professional login portal for PrEP/PEP care platform',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-portal">
      {children}
    </div>
  );
}