import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Languages",
    skills: ["C++ (C++17)", "Java (Java 17)", "Python", "SQL", "Bash", "JavaScript"],
  },
  {
    category: "Tools & Platforms",
    skills: ["AWS", "Docker", "Kubernetes", "Redis", "Jenkins", "GitLab", "Terraform"],
  },
  {
    category: "Skills",
    skills: [
      "Multi-threading",
      "Concurrency",
      "Container Security",
      "Distributed Systems",
      "DevSecOps",
      "Penetration Testing",
    ],
  },
  {
    category: "Certifications",
    skills: ["AWS Certified Machine Learning – Specialty", "Cybersecurity (Stanford Online)", "TensorFlow Developer"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

