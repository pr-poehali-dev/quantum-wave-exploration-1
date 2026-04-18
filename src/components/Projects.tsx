import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Пентхаус «Байкал»",
    category: "Квартира под ключ",
    location: "Иркутск, ул. Карла Маркса",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/e62400a6-2bc4-48c1-be44-b5a89f479668/files/65ce0e6f-d46c-4b00-8a99-a90a5cdc1f83.jpg",
  },
  {
    id: 2,
    title: "Офис IT-компании",
    category: "Коммерческое помещение",
    location: "Иркутск, Академгородок",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/e62400a6-2bc4-48c1-be44-b5a89f479668/files/d5cc833c-0298-46b1-ae2f-4ebb40af19fc.jpg",
  },
  {
    id: 3,
    title: "Загородный дом",
    category: "Частный дом",
    location: "Иркутск, Листвянка",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/e62400a6-2bc4-48c1-be44-b5a89f479668/files/5658153a-a728-40f3-8f13-73c5a7f28ac9.jpg",
  },
  {
    id: 4,
    title: "Резиденция «Ангара»",
    category: "Квартира под ключ",
    location: "Иркутск, Советский район",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/e62400a6-2bc4-48c1-be44-b5a89f479668/files/6023a938-4ca4-4a21-b009-68fc05565d29.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши проекты</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}