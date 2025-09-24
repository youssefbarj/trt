import LipBlushingContraindications from "./components/lip-blushing-contraindications"

export default function LipBlushingContraindicationsPage() {
  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: "#E6D9FF" }}>
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Contre-indications au Glaçage des Lèvres
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Screening médical obligatoire avant toute procédure invasive.
          </p>
        </header>

        {/* Contraindications Grid */}
        <LipBlushingContraindications />

        {/* Warning footer */}
        <div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 mx-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800 mb-2">ATTENTION - Procédure invasive avec aiguilles</h3>
              <p className="text-red-700 mb-4">
                Screening médical complet obligatoire pour éviter complications graves.
              </p>
              <h4 className="text-base font-semibold text-red-800 mb-2">Responsabilité professionnelle</h4>
              <p className="text-red-700">
                Ces contre-indications protègent la santé de vos clientes et votre responsabilité légale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
