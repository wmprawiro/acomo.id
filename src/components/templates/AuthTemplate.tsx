export const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] px-4 pt-12 pb-8 sm:px-6 lg:px-8 bg-background">
      {/* Bagian Header: Flex-1 akan membuatnya mengisi sisa ruang dan mendorong dirinya (dan isinya) ke tengah layar */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[400px] mx-auto">
        <div className="text-center">
          <h1 className="text-[36px] leading-tight font-bold text-foreground tracking-tight">
            acomo
          </h1>
        </div>
      </div>

      {/* Bagian Card (Children): Akan selalu terdorong ke posisi paling bawah karena flex-1 di atasnya */}
      <div className="w-full max-w-[400px] mx-auto mt-12">{children}</div>
    </div>
  );
};
