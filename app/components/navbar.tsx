import { Link } from "react-router"
import { usePuterStore } from "~/lib/puter"

const Navbar = () => {
  const { auth, isLoading } = usePuterStore()

  return (
    <nav className="navbar">
      <Link to="/" className="flex-shrink-0">
        <p className="text-gradient text-2xl font-bold">CVScore</p>
      </Link>

      <div className="flex items-center gap-4 max-sm:gap-2">
        {auth.isAuthenticated && (
          <Link
            to="/upload"
            className="primary-button w-fit max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
          >
            Upload Resume
          </Link>
        )}

        <div className="flex items-center gap-3 max-sm:gap-2">
          {auth.isAuthenticated && auth.user && (
            <div className="flex items-center gap-2 text-sm text-gray-600 max-sm:hidden">
              <span>Welcome, {auth.user.username}</span>
            </div>
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
              className="primary-gradient hover:primary-gradient-hover cursor-pointer rounded-full px-4 py-2 text-white transition-all duration-200 max-sm:px-3 max-sm:py-1.5 max-sm:text-sm"
              onClick={auth.signOut}
            >
              <p>Log Out</p>
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
