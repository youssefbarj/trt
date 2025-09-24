"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const contraindications = [
  {
    id: 1,
    title: "GROSSESSE ET ALLAITEMENT",
    image: "/images/pregnant-woman.webp",
    description:
      "Les changements hormonaux affectent la rétention des pigments et la cicatrisation. Aucune donnée de sécurité concluante pour la mère/bébé avec les pigments permanents et les anesthésiques topiques.",
    category: "Maternité",
  },
  {
    id: 2,
    title: "HISTORIQUE D'HERPÈS LABIAL",
    image: "/images/cold-sores.png",
    description:
      "Le traumatisme des lèvres peut déclencher des poussées d'herpès labial, causant une perte de pigment et des complications. Un pré-traitement antiviral est requis.",
    category: "Virologie",
  },
  {
    id: 3,
    title: "MALADIES AUTO-IMMUNES",
    image: "/images/autoimmune-disease.png",
    description:
      "Les conditions comme le lupus altèrent la cicatrisation cutanée et la rétention des pigments. Le dysfonctionnement du système immunitaire augmente le risque d'infection.",
    category: "Immunologie",
  },
  {
    id: 4,
    title: "TROUBLES DE COAGULATION",
    image: "/images/blood-disorders.png",
    description:
      "Les troubles sanguins causent des saignements excessifs lors de la pénétration de l'aiguille, affectant le placement des pigments et la cicatrisation.",
    category: "Hématologie",
  },
  {
    id: 5,
    title: "DIABÈTE NON CONTRÔLÉ",
    image: "/images/diabetes-blood-sugar.webp",
    description:
      "La cicatrisation altérée et la fonction immunitaire affaiblie augmentent le risque d'infection. Une autorisation médicale est requise.",
    category: "Endocrinologie",
  },
  {
    id: 6,
    title: "TENDANCE AUX CHÉLOÏDES",
    image: "/images/keloid-scarring.webp",
    description:
      "Risque élevé de formation de cicatrices surélevées suite au traumatisme de l'aiguille. Une défiguration permanente est possible.",
    category: "Dermatologie",
  },
  {
    id: 7,
    title: "TRAITEMENT ACCUTANE RÉCENT",
    image: "/images/recent-accutane.png",
    description:
      "Amincissement cutané et hypersensibilité pendant 12 mois post-traitement. Capacité de cicatrisation compromise.",
    category: "Pharmacologie",
  },
  {
    id: 8,
    title: "CANCER ACTIF/CHIMIOTHÉRAPIE",
    image: "/images/cancer-patient.png",
    description:
      "Système immunitaire compromis augmente le risque d'infection. Une autorisation médicale est obligatoire.",
    category: "Oncologie",
  },
]

export default function LipBlushingContraindications() {
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
