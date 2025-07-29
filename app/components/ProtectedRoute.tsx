import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { usePuterStore } from "~/lib/puter"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { auth, isLoading } = usePuterStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return

    // If not authenticated, redirect to home
    if (!auth.isAuthenticated) {
      navigate("/")
      return
    }
  }, [auth.isAuthenticated, isLoading, navigate])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <img src="/images/resume-scan-2.gif" className="mx-auto w-[200px]" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render children (will redirect)
  if (!auth.isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
