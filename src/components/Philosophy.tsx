import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Только премиум материалы",
    description:
      "Мы работаем исключительно с проверенными поставщиками. Итальянская плитка, натуральный камень, паркет из массива — качество, которое видно и ощущается.",
  },
  {
    title: "Фиксированная смета",
    description:
      "Стоимость работ согласовывается до начала ремонта и не меняется. Никаких сюрпризов и доплат в процессе — только честная цена.",
  },
  {
    title: "Авторский надзор",
    description:
      "Персональный прораб на каждом объекте, ежедневные отчёты с фотографиями, доступ к онлайн-дневнику стройки в любое время.",
  },
  {
    title: "Гарантия 5 лет",
    description: "Мы несём ответственность за каждый квадратный метр. Официальный договор, гарантия на все виды работ и установленные материалы.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О компании</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Мы наполняем
              <br />
              <HighlightedText>теплом</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/e62400a6-2bc4-48c1-be44-b5a89f479668/files/5c775086-c491-4bc4-b4a2-069fb81a8b4e.jpg"
                alt="Архитектурный эскиз рабочего пространства"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Компания «HITEC» производит ремонтно-отделочные работы любой сложности — от разработки дизайн-проекта до его реализации, включая инженерно-коммуникационные работы, подбор и комплектацию материалами и предметами интерьера.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              В нашей компании давно сформировалась команда профессиональных мастеров, специалистов и проверенных фирм. Мы способны наполнить теплом и жизнью даже самые холодные стены.
            </p>

            <div className="flex gap-12 mb-12">
              <div>
                <p className="text-5xl font-medium tracking-tight">19+</p>
                <p className="text-muted-foreground text-sm mt-1">лет на рынке</p>
              </div>
              <div>
                <p className="text-5xl font-medium tracking-tight">200+</p>
                <p className="text-muted-foreground text-sm mt-1">реализованных объектов</p>
              </div>
            </div>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}