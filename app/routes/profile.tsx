import { Link } from "react-router"
import { usePuterStore } from "~/lib/puter"
import ProtectedRoute from "~/components/ProtectedRoute"
import Layout from "~/components/Layout"
import { useEffect, useState } from "react"

export const meta = () => [
  { title: "CVScore | Profile" },
  { name: "description", content: "Your account profile and settings" },
]

const Profile = () => {
  const { auth, fs, kv } = usePuterStore()
  const [files, setFiles] = useState<FSItem[]>([])
  const [isWiping, setIsWiping] = useState(false)

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[]
    setFiles(files)
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const handleWipeData = async () => {
    if (!confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
      return
    }

    setIsWiping(true)
    try {
      files.forEach(async (file) => {
        await fs.delete(file.path)
      })
      await kv.flush()
      await loadFiles()
    } catch (error) {
      console.error("Error wiping data:", error)
    } finally {
      setIsWiping(false)
    }
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          {/* Header Section */}
          <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
            <h2 className="text-center">Profile</h2>
          </div>

          {/* Profile Content */}
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {/* User Information Card */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                {/* User Information */}
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-900">{auth.user?.username}</p>
                </div>
              </div>

              {/* Data Management Card */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                  <p className="text-sm text-gray-600">Manage your stored data and files</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Stored Files ({files.length})
                      </h4>
                    </div>
                    <div className="max-h-32 space-y-2 overflow-y-auto">
                      {files.length === 0 ? (
                        <p className="text-sm text-gray-500">No files found</p>
                      ) : (
                        files.map((file) => (
                          <div key={file.id} className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">•</span>
                            <span className="truncate text-gray-600">{file.name}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleWipeData}
                    disabled={isWiping}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 transition-all duration-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isWiping ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                        <span>Clearing Data...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Clear All Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}

export default Profile
