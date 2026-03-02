import { useState } from 'react'
import NearestWarehouse from './components/NearestWarehouse'
import ShippingCharge from './components/ShippingCharge'
import CalculateShipping from './components/CalculateShipping'

type Tab = 'nearest' | 'charge' | 'calculate'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('nearest')

  const tabs: { id: Tab; label: string; description: string }[] = [
    {
      id: 'nearest',
      label: 'Nearest Warehouse',
      description: 'Find the nearest warehouse for a seller',
    },
    {
      id: 'charge',
      label: 'Shipping Charge',
      description: 'Calculate charge from warehouse to customer',
    },
    {
      id: 'calculate',
      label: 'Full Calculation',
      description: 'End-to-end shipping cost estimation',
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
            JT
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent">
              Jumbotail Shipping Estimator
            </h1>
            <p className="text-sm text-slate-400">B2B E-Commerce API Testing Dashboard</p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <div className="text-left">
                <div>{tab.label}</div>
                <div className={`text-xs ${activeTab === tab.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-5xl mx-auto">
        {activeTab === 'nearest' && <NearestWarehouse />}
        {activeTab === 'charge' && <ShippingCharge />}
        {activeTab === 'calculate' && <CalculateShipping />}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
        Jumbotail Shipping Estimator • Built with React + Tailwind CSS v4
      </footer>
    </div>
  )
}

export default App
