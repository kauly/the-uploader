type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col bg-orange-700">
      <header className="py-2 text-center text-lg font-bold text-black">
        The Uploader
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default MainLayout
