// Login page has its own layout to avoid the admin layout wrapper
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

