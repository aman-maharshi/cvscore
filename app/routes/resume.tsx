import { Link, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { usePuterStore } from "~/lib/puter"
import ProtectedRoute from "~/components/ProtectedRoute"
import Layout from "~/components/Layout"
import Summary from "~/components/Summary"
import ATS from "~/components/ATS"
import Details from "~/components/Details"

export const meta = () => [
  { title: "CVScore | Review " },
  { name: "description", content: "Detailed overview of your resume" },
]

const Resume = () => {
  const { isLoading, fs, kv } = usePuterStore()
  const { id } = useParams()
  const [imageUrl, setImageUrl] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadResume()
  }, [id])

  const loadResume = async () => {
    const resume = await kv.get(`resume:${id}`)

    if (!resume) return

    const data = JSON.parse(resume)

    const resumeBlob = await fs.read(data.resumePath)
    if (!resumeBlob) return

    const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" })
    const resumeUrl = URL.createObjectURL(pdfBlob)
    setResumeUrl(resumeUrl)

    const imageBlob = await fs.read(data.imagePath)
    if (!imageBlob) return
    const imageUrl = URL.createObjectURL(imageBlob)
    setImageUrl(imageUrl)

    setFeedback(data.feedback)
    console.log({ resumeUrl, imageUrl, feedback: data.feedback })
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="min-h-screen">
          {/* Modern Header with Back Navigation */}
          <div>
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link
                  to="/"
                  className="group flex items-center gap-3 rounded-xl px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-all duration-200 group-hover:bg-gray-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-500">Resume Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-7xl p-4">
            <div className="flex w-full flex-row gap-8 max-lg:flex-col-reverse">
              {/* Resume Preview Section */}
              <section className="sticky top-8 h-fit w-1/2 max-lg:w-full">
                {imageUrl && resumeUrl && (
                  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div> */}
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={imageUrl}
                        className="h-auto w-full object-contain"
                        title="Click to view full resume"
                        alt="Resume preview"
                      />
                      <div className="absolute right-4 bottom-4 left-4">
                        <div className="rounded-lg bg-white/90 px-3 py-2 text-center backdrop-blur-sm">
                          <span className="text-sm font-medium text-gray-700">
                            Click to view full PDF
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </section>

              {/* Feedback Section */}
              <section className="flex w-1/2 flex-col gap-8 max-lg:w-full">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-gray-900 max-sm:text-3xl">
                    Resume Review
                  </h1>
                  <p className="text-gray-600">
                    Detailed analysis of your resume with actionable insights
                  </p>
                </div>

                {feedback ? (
                  <div className="animate-in fade-in flex flex-col gap-8 duration-1000">
                    <Summary feedback={feedback} />
                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                    <Details feedback={feedback} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <img
                      src="/images/resume-scan-2.gif"
                      className="w-full max-w-md rounded-lg"
                      alt="Analyzing resume"
                    />
                    <p className="mt-4 text-center text-gray-600">Analyzing your resume...</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
export default Resume
