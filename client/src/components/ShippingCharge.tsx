import { useState } from 'react'

interface ShippingResult {
  shippingCharge: number
  transportMode: string
  deliverySpeed: string
  breakdown: {
    baseCharge: number
    expressSurcharge: number
    distanceCharge: number
    distanceKm: number
    weightKg: number
    ratePerKmPerKg: number
  }
}

export default function ShippingCharge() {
  const [warehouseId, setWarehouseId] = useState('1')
  const [customerId, setCustomerId] = useState('1')
  const [deliverySpeed, setDeliverySpeed] = useState('standard')
  const [result, setResult] = useState<ShippingResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(
        `/api/v1/shipping-charge?warehouseId=${warehouseId}&customerId=${customerId}&deliverySpeed=${deliverySpeed}`
      )
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error?.message || 'Request failed')
      }

      setResult(data.data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg font-semibold text-white">Shipping Charge</h2>
        </div>

        <div className="mb-4 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 font-mono">
          GET /api/v1/shipping-charge
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Warehouse ID</label>
            <input
              type="number"
              value={warehouseId}
              onChange={(e) => setWarehouseId(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              placeholder="e.g. 1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Customer ID</label>
            <input
              type="number"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              placeholder="e.g. 1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Delivery Speed</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeliverySpeed('standard')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  deliverySpeed === 'standard'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setDeliverySpeed('express')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  deliverySpeed === 'express'
                    ? 'bg-warning text-black shadow-lg shadow-warning/25'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                Express
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating...
              </span>
            ) : (
              'Calculate Shipping Charge'
            )}
          </button>
        </form>
      </div>

      {/* Result Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg font-semibold text-white">Response</h2>
        </div>

        {!result && !error && (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500">
            <p>Submit a request to see results</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/20">
            <p className="text-error font-medium">Error</p>
            <p className="text-sm text-red-300 mt-1">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-3">
            {/* Main charge */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 text-center">
              <p className="text-sm text-slate-300 mb-1">Total Shipping Charge</p>
              <p className="text-4xl font-bold text-white">₹{result.shippingCharge}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">
                  {result.transportMode}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  result.deliverySpeed === 'express'
                    ? 'bg-warning/20 text-warning'
                    : 'bg-success/20 text-success'
                }`}>
                  {result.deliverySpeed}
                </span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-300 px-1">Breakdown</p>
              <ResultRow label="Distance" value={`${result.breakdown.distanceKm} km`} />
              <ResultRow label="Weight" value={`${result.breakdown.weightKg} kg`} />
              <ResultRow label="Rate" value={`₹${result.breakdown.ratePerKmPerKg}/km/kg`} />
              <ResultRow label="Base Charge" value={`₹${result.breakdown.baseCharge}`} />
              {result.breakdown.expressSurcharge > 0 && (
                <ResultRow label="Express Surcharge" value={`₹${result.breakdown.expressSurcharge}`} />
              )}
              <ResultRow label="Distance Charge" value={`₹${result.breakdown.distanceCharge}`} />
            </div>

            <details className="mt-4">
              <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300">
                View Raw JSON
              </summary>
              <pre className="mt-2 p-3 rounded-xl bg-black/30 text-xs text-emerald-400 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-white/5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  )
}
