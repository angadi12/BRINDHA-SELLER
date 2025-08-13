"use client"

import { Monitor, Smartphone } from "lucide-react"

export default function MobileWarning() {
  return (
    <div className="min-h-screen bg-[#106C83]/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="relative mx-auto w-20 h-20 mb-4">
            <Monitor className="w-12 h-12 text-[#106C83] absolute top-0 left-4" />
            <Smartphone className="w-8 h-8 text-gray-400 absolute bottom-0 right-4" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Desktop Required</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          This dashboard is optimized for larger screens and is not supported on mobile devices. Please access it from a
          desktop or tablet for the best experience.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#106C83]">
            <strong>Minimum screen width:</strong> 768px or larger
          </p>
        </div>

        <div className="text-xs text-gray-500">Switch to a larger device to continue</div>
      </div>
    </div>
  )
}
