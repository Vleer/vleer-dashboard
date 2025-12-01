import React from 'react';
import './index.css';
import { applications, operations } from './config/apps';

const configuredOrigin = import.meta.env.VITE_BASE_ORIGIN;

// Build the base URL dynamically, with optional port override
const getBaseUrl = (portOverride) => {
  // If a fixed origin is provided (e.g. http://192.168.0.24), honor it
  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, '');
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = portOverride ?? window.location.port;
  const explicitOverride = portOverride !== undefined && portOverride !== null;
  const isStandardPort = port === '' || port === '80' || port === '443';

  // If the dashboard is served on a NodePort/port-forward (non-standard port) and no explicit
  // override was given, fall back to the ingress port (80/443) so links resolve correctly.
  const portToUse = explicitOverride ? port : (isStandardPort ? port : '');
  const portSegment = portToUse ? `:${portToUse}` : '';
  return `${protocol}//${hostname}${portSegment}`;
};

// Build a full URL to a service, forcing a specific port when provided
const buildServiceUrl = (path, port) => {
  // If path is already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${getBaseUrl(port)}${path}`;
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#e8e4d9] to-[#d4cfc0] text-[#3a3a2f] font-serif selection:bg-[#9b8b6f] selection:text-white overflow-hidden relative">
      {/* Art Nouveau Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="artNouveau" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M100,0 Q120,50 100,100 Q80,50 100,0" fill="none" stroke="#9b8b6f" strokeWidth="0.5"/>
              <path d="M0,100 Q50,120 100,100 Q50,80 0,100" fill="none" stroke="#9b8b6f" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="3" fill="#9b8b6f"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#artNouveau)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        {/* Applications Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#5a5a4f] relative inline-block w-full">
            <span className="relative">
              Applications
              <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,4 Q32,0 64,4 Q96,8 128,4" fill="none" stroke="#9b8b6f" strokeWidth="1.5"/>
              </svg>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="group relative">
                {/* Main App Card */}
                <div className="relative">
                  {/* Art Nouveau Border */}
                  <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition duration-500">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" 
                            fill="none" stroke="#c9a961" strokeWidth="2" rx="24"
                            strokeDasharray="4,4"/>
                    </svg>
                  </div>
                  
                  {/* Card */}
                  <a 
                    href={buildServiceUrl(app.paths.main)}
                    className="relative block bg-gradient-to-br from-[#fdfbf7]/95 to-[#f5f1e8]/95 backdrop-blur-sm border-2 border-[#9b8b6f]/30 rounded-3xl p-8 hover:border-[#c9a961] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#9b8b6f]/20"
                    style={{
                      boxShadow: '0 4px 20px rgba(155, 139, 111, 0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#9b8b6f] flex items-center justify-center text-2xl shadow-lg relative overflow-hidden">
                        {/* Art Nouveau corner decoration */}
                        <svg className="absolute top-0 right-0 w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16,0 Q8,0 8,8" fill="none" stroke="#f5f1e8" strokeWidth="1" opacity="0.3"/>
                        </svg>
                        {app.logo ? (
                          <img
                            src={app.logo}
                            alt={`${app.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-2xl">✨</span>
                        )}
                      </div>
                      <div className="text-[#9b8b6f] group-hover:text-[#c9a961] transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-[#3a3a2f] group-hover:text-[#5a5a4f] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {app.name}
                    </h3>
                    <p className="text-[#6a6a5f] text-sm leading-relaxed">{app.description}</p>
                    
                    {/* Decorative flourish */}
                    <svg className="absolute bottom-4 right-4 w-8 h-8 opacity-20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16,8 Q20,12 16,16 Q12,12 16,8 M16,16 Q20,20 16,24 Q12,20 16,16" fill="none" stroke="#9b8b6f" strokeWidth="1"/>
                      <circle cx="16" cy="16" r="2" fill="#9b8b6f"/>
                    </svg>
                  </a>
                </div>

                {/* Develop Branch */}
                {app.paths.develop && (
                  <div className="mt-3 ml-4">
                    <a 
                      href={buildServiceUrl(app.paths.develop)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8e4d9]/60 border border-[#9b8b6f]/30 text-[#6a6a5f] hover:text-[#3a3a2f] hover:border-[#9b8b6f]/50 hover:bg-[#e8e4d9] transition-all text-xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b8b6f]"></span>
                      <span>develop</span>
                      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Operations Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#5a5a4f] relative inline-block w-full">
            <span className="relative">
              Operations
              <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2" viewBox="0 0 128 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,4 Q32,0 64,4 Q96,8 128,4" fill="none" stroke="#9b8b6f" strokeWidth="1.5"/>
              </svg>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((op) => (
              <a
                key={op.id}
                href={buildServiceUrl(op.path, op.port)}
                className="group relative block bg-gradient-to-br from-[#fdfbf7]/80 to-[#f5f1e8]/80 backdrop-blur-sm border-2 border-[#9b8b6f]/20 rounded-2xl p-6 hover:border-[#c9a961]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b8b6f]/10"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{op.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#3a3a2f] group-hover:text-[#5a5a4f] transition-colors mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {op.name}
                    </h3>
                    <p className="text-[#6a6a5f] text-sm">{op.description}</p>
                  </div>
                  <div className="text-[#9b8b6f] group-hover:text-[#c9a961] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer with Art Nouveau styling */}
        <footer className="mt-12 text-center text-[#6a6a5f] text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-16 h-1" viewBox="0 0 64 4" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,2 Q16,0 32,2 Q48,4 64,2" fill="none" stroke="#9b8b6f" strokeWidth="1"/>
            </svg>
            <span className="text-[#9b8b6f]">✦</span>
            <svg className="w-16 h-1" viewBox="0 0 64 4" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,2 Q16,0 32,2 Q48,4 64,2" fill="none" stroke="#9b8b6f" strokeWidth="1"/>
            </svg>
          </div>
          <p>Powered by Kubernetes • ArgoCD • Nginx Ingress</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
