import React from 'react';
import './index.css';

// Build the base URL dynamically, with optional port override
const getBaseUrl = (portOverride) => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = portOverride ?? window.location.port;
  const portSegment = port ? `:${port}` : '';
  return `${protocol}//${hostname}${portSegment}`;
};

// Build a full URL to a service, forcing a specific port when provided
const buildServiceUrl = (path, port) => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const portSegment = port ? `:${port}` : '';
  return `${protocol}//${hostname}${portSegment}${path}`;
};

const apps = [
  { 
    name: 'Dobbelen', 
    description: 'A web app for rolling virtual dice and tracking results.',
    path: '/dobbelen',
    logo: '/assets/dobbelen-logo.png',
    developPath: '/dobbelen-dev' 
  },
  { 
    name: 'Quiz App', 
    description: 'An interactive quiz platform for creating and taking quizzes.',
    path: '/quizapp',
    logo: '/assets/quizapp-logo.png',
    developPath: '/quizapp-dev'
  },
  { 
    name: 'Townsend', 
    description: 'Townsend application',
    path: '/townsend',
    developPath: '/townsend-dev'
  },
];

const operations = [
  {
    name: 'ArgoCD',
    description: 'GitOps continuous delivery',
    path: '/argocd',
    port: 30100,
    icon: '🔄'
  }
];

function App() {
  const baseUrl = getBaseUrl();

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="inline-block mb-6">
            <div className="text-6xl mb-4">🚀</div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Vleer Dashboard
            </span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Your central hub for all applications and services
          </p>
        </header>

        {/* Applications Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-slate-200">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div key={app.name} className="group relative">
                {/* Main App Card */}
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>
                  
                  {/* Card */}
                  <a 
                    href={`${baseUrl}${app.path}`}
                    className="relative block bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg overflow-hidden">
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
                      <div className="text-slate-500 group-hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{app.description}</p>
                  </a>
                </div>

                {/* Develop Branch - Outside and Subtle */}
                {app.developPath && (
                  <div className="mt-3 ml-4">
                    <a 
                      href={`${baseUrl}${app.developPath}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800/50 text-slate-600 hover:text-slate-400 hover:border-slate-700/50 transition-all text-xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
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
        <section>
          <h2 className="text-3xl font-bold mb-8 text-slate-200">Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((op) => (
              <a
                key={op.name}
                href={buildServiceUrl(op.path, op.port)}
                className="group relative block bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{op.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors mb-1">
                      {op.name}
                    </h3>
                    <p className="text-slate-500 text-sm">{op.description}</p>
                  </div>
                  <div className="text-slate-600 group-hover:text-cyan-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>Powered by Kubernetes • ArgoCD • Nginx Ingress</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
