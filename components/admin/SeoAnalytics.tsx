'use client'

export default function SeoAnalytics() {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-dm-sans font-bold text-green-deep">
            SEO Analytics
          </h2>
          <p className="text-text-mid mt-1">
            Track and optimize your website's search performance
          </p>
        </div>
      </div>

      {/* SEO Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-[16px] p-4 border border-green-deep/10">
          <div className="text-sm text-text-mid mb-1">Organic Traffic</div>
          <div className="text-2xl font-bold text-green-deep">--</div>
          <div className="text-xs text-text-mid mt-2">Connect Google Analytics</div>
        </div>
        <div className="bg-gray-50 rounded-[16px] p-4 border border-green-deep/10">
          <div className="text-sm text-text-mid mb-1">Keyword Rankings</div>
          <div className="text-2xl font-bold text-green-deep">--</div>
          <div className="text-xs text-text-mid mt-2">Connect Search Console</div>
        </div>
        <div className="bg-gray-50 rounded-[16px] p-4 border border-green-deep/10">
          <div className="text-sm text-text-mid mb-1">Page Speed Score</div>
          <div className="text-2xl font-bold text-green-deep">--</div>
          <div className="text-xs text-text-mid mt-2">Run PageSpeed test</div>
        </div>
      </div>

      {/* SEO Tools */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-[16px] p-6 border border-green-deep/10">
          <h3 className="font-dm-sans font-semibold text-green-deep mb-4">
            SEO Health Check
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-text-mid">Meta Descriptions</span>
              <span className="text-green-600 font-medium">Complete</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-text-mid">Title Tags</span>
              <span className="text-green-600 font-medium">Complete</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-text-mid">Image Alt Text</span>
              <span className="text-yellow-600 font-medium">Review Needed</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-text-mid">Mobile Responsiveness</span>
              <span className="text-green-600 font-medium">Pass</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
