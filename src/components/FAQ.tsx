import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит ремонт квартиры под ключ?",
    answer:
      "Стоимость зависит от площади, состояния помещения и выбранных материалов. Ремонт премиум класса начинается от 12 000 руб./м². Точную стоимость рассчитываем бесплатно после выезда специалиста на объект.",
  },
  {
    question: "Сколько времени занимает ремонт?",
    answer:
      "Квартира площадью 60–80 м² — в среднем 3–4 месяца. Сроки фиксируются в договоре. За каждый день просрочки по нашей вине мы выплачиваем неустойку — это прописано в договоре.",
  },
  {
    question: "Вы работаете только в Иркутске?",
    answer:
      "Основная география — Иркутск и Иркутская область (Ангарск, Шелехов, Листвянка). Для крупных проектов готовы рассматривать выезд в другие города — обсуждается индивидуально.",
  },
  {
    question: "Вы делаете дизайн-проект или только ремонт?",
    answer:
      "Мы оказываем полный цикл: разработка дизайн-проекта с 3D-визуализацией, подбор и закупка материалов, сам ремонт и авторский надзор. Можем работать и по готовому дизайн-проекту стороннего дизайнера.",
  },
  {
    question: "Какая гарантия на работы?",
    answer:
      "Мы даём официальную гарантию 5 лет на все виды выполненных работ. Если в этот период что-то пойдёт не так по нашей вине — устраним за свой счёт.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Позвоните или оставьте заявку на сайте. Наш специалист бесплатно выедет на объект, сделает замеры, обсудит пожелания и подготовит смету в течение 3 рабочих дней.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}