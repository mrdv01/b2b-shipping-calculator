import { useState } from 'react'

interface WarehouseResult {
  warehouseId: number
  warehouseName: string
  warehouseLocation: { lat: number; long: number }
  distanceFromSeller: number
}

export default function NearestWarehouse() {
  const [sellerId, setSellerId] = useState('1')
  const [productId, setProductId] = useState('1')
  const [result, setResult] = useState<WarehouseResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(
        `/api/v1/warehouse/nearest?sellerId=${sellerId}&productId=${productId}`
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
          <h2 className="text-lg font-semibold text-white">Find Nearest Warehouse</h2>
        </div>

        <div className="mb-4 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 font-mono">
          GET /api/v1/warehouse/nearest
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Seller ID</label>
            <input
              type="number"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              placeholder="e.g. 1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Product ID</label>
            <input
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              placeholder="e.g. 1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              'Find Nearest Warehouse'
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
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-success font-medium mb-2">Warehouse Found</p>
            </div>

            <div className="space-y-2">
              <ResultRow label="Warehouse ID" value={result.warehouseId} />
              <ResultRow label="Name" value={result.warehouseName} />
              <ResultRow label="Latitude" value={result.warehouseLocation.lat} />
              <ResultRow label="Longitude" value={result.warehouseLocation.long} />
              <ResultRow label="Distance" value={`${result.distanceFromSeller} km`} highlight />
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

function ResultRow({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-white/5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-accent-light' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}
