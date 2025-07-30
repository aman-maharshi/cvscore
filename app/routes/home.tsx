import type { Route } from "./+types/home"
import Layout from "~/components/Layout"
import ResumeCard from "~/components/ResumeCard"
import ProtectedRoute from "~/components/ProtectedRoute"
import { usePuterStore } from "~/lib/puter"
import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { resumes as mockResumes } from "../../constants"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CVScore" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ]
}

export default function Home() {
  const { auth, kv } = usePuterStore()
  const location = useLocation()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false)

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true)

      const resumes = (await kv.list("resume:*", true)) as KVItem[]

      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume)

      setResumes(parsedResumes || [])
      setLoadingResumes(false)
    }

    loadResumes()
  }, [])

  return (
    <Layout>
      <section className="main-section">
        {!auth.isAuthenticated ? (
          // Welcome section for non-authenticated users
          <div className="page-heading py-8">
            <h1 className="mb-6 text-center text-4xl font-bold">Welcome to CVScore</h1>
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <p className="text-xl leading-relaxed text-gray-700">
                CVScore is your AI-powered resume analysis tool that provides smart feedback to help
                you land your dream job. Get instant insights on your resume's ATS compatibility,
                content quality, and improvement suggestions.
              </p>

              <div className="rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">What CVScore offers:</h2>
                <div className="grid gap-6 text-left md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-green-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">ATS Optimization</h3>
                        <p className="text-sm text-gray-600">
                          Ensure your resume passes through Applicant Tracking Systems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-blue-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">AI-Powered Analysis</h3>
                        <p className="text-sm text-gray-600">
                          Get detailed feedback on content, structure, and keywords
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-purple-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Smart Scoring</h3>
                        <p className="text-sm text-gray-600">
                          Receive comprehensive ratings and improvement suggestions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-orange-500"></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Track Progress</h3>
                        <p className="text-sm text-gray-600">
                          Monitor your resume improvements over time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Existing content for authenticated users
          <ProtectedRoute>
            <div className="page-heading py-8">
              {!loadingResumes && resumes?.length === 0 ? (
                <h2>No resumes found. Upload your first resume to get feedback.</h2>
              ) : (
                <h2>Review your submissions and check AI-powered feedback.</h2>
              )}
            </div>
            {loadingResumes && (
              <div className="flex flex-col items-center justify-center">
                <img src="/images/resume-scan-2.gif" className="w-[200px]" />
              </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
              <div className="resumes-section">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            )}

            {!loadingResumes && resumes?.length === 0 && (
              <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                  Upload Resume
                </Link>
              </div>
            )}
          </ProtectedRoute>
        )}
      </section>
    </Layout>
  )
}
