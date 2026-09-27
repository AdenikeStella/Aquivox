import Header from "../components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <Header
            title=""
            description=""
            canGoBack = {true}
            where="Home"/>

      <div className="relative md:px-20">{children}</div>
    </div>
  );
}
