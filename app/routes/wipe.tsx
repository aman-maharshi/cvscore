import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { usePuterStore } from "~/lib/puter"
import ProtectedRoute from "~/components/ProtectedRoute"
import Layout from "~/components/Layout"

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore()
  const navigate = useNavigate()
  const [files, setFiles] = useState<FSItem[]>([])

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[]
    setFiles(files)
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path)
    })
    await kv.flush()
    loadFiles()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error {error}</div>
  }

  return (
    <Layout>
      <ProtectedRoute>
        <section className="main-section">
          <div className="page-heading">
            <h2>Clear all stored data and files</h2>

            <div className="mt-8 rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Existing Files:</h3>
                <div className="space-y-2">
                  {files.length === 0 ? (
                    <p className="text-gray-600">No files found</p>
                  ) : (
                    files.map((file) => (
                      <div key={file.id} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-800">{file.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  className="cursor-pointer rounded-md bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-600"
                  onClick={() => handleDelete()}
                >
                  Wipe All Data
                </button>
              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </Layout>
  )
}

export default WipeApp
