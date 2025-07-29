import { Link, useLocation, useNavigate } from "react-router"
import { usePuterStore } from "~/lib/puter"

const Navbar = () => {
  const { auth, isLoading } = usePuterStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="navbar">
        <Link to="/" className="group flex flex-shrink-0 items-center gap-3">
          <img
            src="/logo.png"
            alt="CVScore Logo"
            className="h-8 w-8 rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <p className="text-gradient text-xl leading-tight font-bold">CVScore</p>
            <p className="-mt-1 text-xs text-gray-500">AI Resume Analysis</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 max-sm:gap-2">
          {auth.isAuthenticated && (
            <Link
              to="/upload"
              className={`relative flex w-fit items-center gap-2 transition-all duration-200 hover:shadow-md max-sm:px-3 max-sm:py-1.5 max-sm:text-sm ${
                isActive("/upload")
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              } rounded-lg px-4 py-2`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Resume
              {/* Active indicator */}
              {isActive("/upload") && (
                <div className="absolute -bottom-1 left-1/2 h-1 w-1/2 -translate-x-1/2 rounded-full bg-blue-500"></div>
              )}
            </Link>
          )}

          {auth.isAuthenticated && (
            <Link
              to="/profile"
              className={`relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm ${
                isActive("/profile")
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="max-sm:hidden">Profile</span>
              {/* Active indicator */}
              {isActive("/profile") && (
                <div className="absolute -bottom-1 left-1/2 h-1 w-1/2 -translate-x-1/2 rounded-full bg-blue-500"></div>
              )}
            </Link>
          )}

          {isLoading ? (
            <button
              className="primary-gradient flex animate-pulse cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-white max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              disabled
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Loading...</span>
            </button>
          ) : auth.isAuthenticated ? (
            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              onClick={() => {
                auth.signOut()
                navigate("/")
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          ) : (
            <button
              className="primary-gradient hover:primary-gradient-hover flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:shadow-md max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              onClick={auth.signIn}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
