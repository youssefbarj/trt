"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const contraindications = [
  {
    id: 1,
    title: "INFECTIONS ET INFLAMMATIONS OCULAIRES",
    image: "/images/eye-infections.png",
    description:
      "Les infections oculaires actives (conjonctivite, orgelet, blépharite) peuvent se propager avec la manipulation des cils. Les adhésifs et produits peuvent aggraver l'inflammation et retarder la guérison.",
    category: "Ophtalmologie",
  },
  {
    id: 2,
    title: "CHIRURGIES ET PROCÉDURES RÉCENTES",
    image: "/images/recent-surgeries.png",
    description:
      "Les chirurgies oculaires récentes (moins de 6 mois) nécessitent une cicatrisation complète. Les extensions peuvent exercer une tension sur les tissus fragiles et compromettre la guérison.",
    category: "Chirurgie",
  },
  {
    id: 3,
    title: "ALLERGIES CONNUES",
    image: "/images/known-allergies.png",
    description:
      "Les allergies aux adhésifs, latex, formaldéhyde ou autres composants peuvent provoquer des réactions graves : gonflements, démangeaisons, difficultés respiratoires nécessitant un traitement d'urgence.",
    category: "Allergies",
  },
  {
    id: 4,
    title: "GROSSESSE ET ALLAITEMENT",
    image: "/images/pregnancy-breastfeeding.png",
    description:
      "Les changements hormonaux affectent la croissance des cils et la sensibilité cutanée. Les vapeurs d'adhésifs peuvent être préoccupantes, et les résultats peuvent être imprévisibles.",
    category: "Maternité",
  },
  {
    id: 5,
    title: "MALADIES OCULAIRES CHRONIQUES",
    image: "/images/chronic-eye-diseases.png",
    description:
      "Les conditions comme le glaucome, la sécheresse oculaire chronique ou les troubles de la paupière compromettent la santé oculaire et peuvent être aggravées par les extensions.",
    category: "Pathologies chroniques",
  },
  {
    id: 6,
    title: "LENTILLES DE CONTACT",
    image: "/images/contact-lenses.png",
    description:
      "Les lentilles peuvent interférer avec l'application et l'entretien des extensions. Les huiles de nettoyage et les frottements répétés réduisent la durée de vie des extensions.",
    category: "Équipement oculaire",
  },
  {
    id: 7,
    title: "HISTORIQUE DE DOMMAGES AUX CILS",
    image: "/images/lash-damage-history.png",
    description:
      "Les cils déjà fragilisés par des traitements antérieurs, trichotillomanie ou dommages chimiques ne peuvent pas supporter le poids des extensions sans risquer une perte permanente.",
    category: "Historique capillaire",
  },
  {
    id: 8,
    title: "HYPERSENSIBILITÉ CUTANÉE",
    image: "/images/skin-hypersensitivity.png",
    description:
      "La peau hypersensible ou les conditions comme l'eczéma périoculaire réagissent mal aux adhésifs et produits chimiques, causant irritations, rougeurs et inconfort prolongé.",
    category: "Dermatologie",
  },
]

export default function ContraindicationsGrid() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowHints(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasInteracted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setVisibleCards((prev) => new Set([...prev, cardId]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const cards = gridRef.current?.querySelectorAll("[data-card-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const handleCardHover = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHints(false)
    }
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {contraindications.map((item, index) => (
        <div
          key={item.id}
          data-card-id={item.id}
          className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden border-2 border-red-100 hover:border-red-300 hover:scale-105 transform ${
            visibleCards.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 80}ms`,
          }}
          onMouseEnter={handleCardHover}
        >
          {showHints && !hasInteracted && (
            <div className="absolute top-3 left-3 z-10 opacity-50 transition-opacity duration-200 group-hover:opacity-0">
              <Image src="/images/cursor-icon.png" alt="Hover hint" width={20} height={20} className="drop-shadow-md" />
            </div>
          )}

          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 transition-transform duration-200 group-hover:scale-110">
            ATTENTION
          </div>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-50 to-red-100">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 ease-out" />
          </div>

          <div className="p-6">
            <div className="mb-2">
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full transition-colors duration-200 group-hover:bg-red-200">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-200">
              {item.title}
            </h3>
          </div>

          <div className="absolute inset-0 bg-red-600 bg-opacity-95 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-center transform translate-y-2 group-hover:translate-y-0">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">Pourquoi cette contre-indication ?</h4>
              </div>
              <p className="text-sm leading-relaxed text-white text-opacity-90">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
