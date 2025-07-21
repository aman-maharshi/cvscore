import Navbar from "~/components/navbar"
import type { Route } from "./+types/home"
import { resumes } from "../../constants"
import { useState } from "react"
import { Link } from "react-router"
import ResumeCard from "~/components/ResumeCard"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CVScore" },
    {
      name: "description",
      content: "CVScore helps you analyze your CV and improve your chances of getting hired.",
    },
  ]
}

export default function Home() {
  const [loadingResumes, setLoadingResumes] = useState(false)

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications and Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

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
      </section>
    </main>
  )
}
