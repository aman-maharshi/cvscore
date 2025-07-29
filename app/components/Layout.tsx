import type { ReactNode } from "react"
import Navbar from "./navbar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <Navbar />

      <div className="flex min-h-screen flex-col pt-16">
        <div className="flex-1">{children}</div>

        <footer className="mt-auto bg-transparent py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-sm text-gray-500">© 2025 CVScore</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default Layout
