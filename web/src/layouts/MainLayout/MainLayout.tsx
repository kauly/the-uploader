type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col bg-orange-700">
      <header className="py-8 text-center text-lg font-bold text-black">
        The Uploader
      </header>
      <main className="container mx-auto flex-1">{children}</main>
    </div>
  )
}

export default MainLayout
