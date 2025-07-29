import { Link } from "react-router"
import { usePuterStore } from "~/lib/puter"

const Navbar = () => {
  const { auth, isLoading } = usePuterStore()

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
      <div className="navbar">
        <Link to="/" className="flex-shrink-0">
          <p className="text-gradient text-2xl font-bold">CVScore</p>
        </Link>

        <div className="flex items-center gap-3 max-sm:gap-2">
          {auth.isAuthenticated && auth.user && (
            <div className="text-xs text-gray-500 max-sm:hidden">Welcome, {auth.user.username}</div>
          )}

          {auth.isAuthenticated && (
            <Link
              to="/upload"
              className="primary-button w-fit max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
            >
              Upload Resume
            </Link>
          )}

          {isLoading ? (
            <button
              className="primary-gradient animate-pulse cursor-pointer rounded-full px-4 py-2 text-white max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              disabled
            >
              <p>Loading...</p>
            </button>
          ) : auth.isAuthenticated ? (
            <button
              className="cursor-pointer rounded-full px-4 py-2 text-neutral-500 transition-all duration-200 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              onClick={auth.signOut}
            >
              <p>Logout</p>
            </button>
          ) : (
            <button
              className="primary-gradient hover:primary-gradient-hover cursor-pointer rounded-full px-4 py-2 text-white transition-all duration-200 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              onClick={auth.signIn}
            >
              <p>Log In</p>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
