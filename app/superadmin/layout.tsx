import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SuperAdmin Portal - PrEP/PEP Care',
  description: 'SuperAdmin command center for PrEP/PEP care platform management',
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="superadmin-portal">
      {children}
    </div>
  );
}