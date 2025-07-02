import { Card, CardContent } from "@/components/ui/card"

interface ExperienceProps {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

const experiences: ExperienceProps[] = [
  {
    title: "Research Assistant, Cybersecurity",
    company: "University of Texas at Arlington",
    location: "Arlington, TX",
    period: "Jan 2025 – Present",
    description: [
      "Researched container security, building an automated pipeline with Docker, AWS, and scanners (Trivy, Grype, Snyk) to reduce container based vulnerabilities.",
      "Implemented multi-threaded C++17 modules and Bash scripts for real-time vulnerability detection and image optimization.",
      "Collaborated with faculty to integrate findings into DevSecOps workflows, targeting publication at SCRF 2025.",
    ],
  },
  {
    title: "PLTL Leader for Computer Science",
    company: "Academic Success Centre, UTA",
    location: "Arlington, TX",
    period: "Aug 2023 – Present",
    description: [
      "Lead weekly PLTL sessions for 6-8 students in OOP (C++) and Data Structures, mastering C++17 concepts.",
      "Develop C++ tutoring tools (e.g., algorithm visualizers) to enhance learning, strengthening systems programming skills.",
    ],
  },
  {
    title: "Tutor, Trio Special Student Services",
    company: "Academic Success Centre, UTA",
    location: "Arlington, TX",
    period: "Jan 2025 – Present",
    description: [
      "Tutored underrepresented students in C++ and Java (OOP, algorithms), boosting pass rates by 35%.",
      "Created practice problems and debugged code live, enhancing concurrency skills.",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-2">
              <h3 className="font-semibold text-xl">{exp.title}</h3>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {exp.company} | {exp.location}
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {exp.description.map((item, i) => (
                <li key={i} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

