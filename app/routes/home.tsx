import Navbar from "~/components/navbar"
import type { Route } from "./+types/home"

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
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track your Applications and Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
      </section>
    </main>
  )
}
