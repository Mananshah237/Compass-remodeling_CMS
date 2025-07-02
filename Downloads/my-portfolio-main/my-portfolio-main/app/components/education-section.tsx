import { Card, CardContent } from "@/components/ui/card"

export default function EducationSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-2">
          <h3 className="font-semibold text-xl">University of Texas at Arlington</h3>
          <span className="text-sm text-muted-foreground">Aug. 2022 – May 2026</span>
        </div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science | Arlington, TX</p>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm">GPA: 3.7 with honors and Certification in CyberSecurity</li>
          <li className="text-sm">
            Relevant Courses: Data Structures and Algorithms, OOP (C++ & Java), Operating Systems, Computer Networks,
            Information Security, Database Systems(SQL & Relational Design), Distributed Systems
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

