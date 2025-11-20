# Vleer Dashboard

[![GitHub](https://img.shields.io/badge/GitHub-Vleer%2Fvleer--dashboard-blue?logo=github)](https://github.com/Vleer/vleer-dashboard)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

> 🚀 Centralized hub for accessing all applications and services with path-based routing

## 🎯 Overview

The Vleer Dashboard is a centralized hub for accessing all applications and services running on your server. It uses **path-based routing** instead of DNS-based routing, making it accessible via IP address without requiring DNS configuration.

> Tip: Set `VITE_BASE_ORIGIN=http://<ip-or-host>` when you build if you’re opening the dashboard through a port-forward/NodePort. This forces all links to point at the ingress origin (port 80/443) so they resolve correctly.

## 🌐 Access URLs

**Main Dashboard**: `http://192.168.0.24`

### Applications
- **Dobbelen**: `http://192.168.0.24/dobbelen/`
  - Develop: `http://192.168.0.24/dobbelen-dev/`
- **Quiz App**: `http://192.168.0.24/quizapp/`
  - Develop: `http://192.168.0.24/quizapp-dev/`
- **Townsend**: `http://192.168.0.24/townsend/`
  - Develop: `http://192.168.0.24/townsend-dev/`

### Operations
- **ArgoCD**: `http://192.168.0.24:30100/argocd/`

## 🎨 Dashboard Features

### Design
- **Branding**: "Vleer Dashboard" with rocket emoji (🚀)
- **Dark Theme**: Deep slate background (#0a0e1a) with purple/blue gradients
- **Modern UI**: Glassmorphism, smooth animations, hover effects
- **Responsive**: Works on all screen sizes

### Layout
1. **Applications Section**: 
   - Large, prominent cards for main apps
   - Gradient glow effects on hover
   - Clear visual hierarchy
   
2. **Develop Branches**: 
   - Subtle, outside the main cards
   - Greyed out appearance (not primary action)
   - Small rounded pills with dot indicator

3. **Operations Section**:
   - Separate section below apps
   - Horizontal layout with icons
   - Cyan accent colors (different from apps)

## 🔧 Technical Architecture

### Routing Strategy
All services use **path-based routing** via nginx ingress controller:
- No DNS required
- Works with IP addresses
- Centralized on port 80/443

### Ingress Configuration
Each app has its own ingress with:
- `spec.rules[].http.paths[]` - Path-based routing
- `nginx.ingress.kubernetes.io/rewrite-target: /$2` - Strip path prefix
- `nginx.ingress.kubernetes.io/use-regex: "true"` - Enable regex matching

Example path structure:
```
/quizapp/api/* → quiz-backend:8080 (rewritten to /*)
/quizapp/* → quiz-frontend:3000 (rewritten to /*)
```

### Dashboard Deployment
- **Image**: `localhost:32000/dashboard:latest`
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4
- **Build**: Multi-stage Docker (Node.js → Nginx)
- **Deployment**: Kubernetes via ArgoCD

## 📁 Infrastructure Files

```
/home/vleer/infra/
├── apps/
│   ├── argocd/
│   │   └── ingress.yaml          # ArgoCD path: /argocd
│   ├── dashboard/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml          # Catch-all: /
│   ├── dobbelen/
│   │   └── ingress.yaml          # Path: /dobbelen
│   ├── dobbelen-develop/
│   │   └── ingress.yaml          # Path: /dobbelen-dev
│   ├── quizapp/
│   │   └── ingress.yaml          # Path: /quizapp
│   ├── quizapp-develop/
│   │   └── ingress.yaml          # Path: /quizapp-dev
│   ├── townsend/
│   │   └── ingress.yaml          # Path: /townsend
│   └── townsend-develop/
│       └── ingress.yaml          # Path: /townsend-dev
└── argocd-apps/
    └── dashboard-application.yaml
```

## 🚀 Deployment Workflow

1. **Code Changes**: Update dashboard code in `/home/vleer/dashboard`
2. **Build**: `npm run build`
3. **Docker**: `docker build -t localhost:32000/dashboard:latest .`
4. **Push**: `docker push localhost:32000/dashboard:latest`
5. **Deploy**: `kubectl rollout restart deployment dashboard`

For infrastructure changes:
1. **Update**: Modify files in `/home/vleer/infra/apps/`
2. **Commit**: `git add . && git commit -m "message" && git push`
3. **Sync**: ArgoCD auto-syncs within ~3 minutes

## ✅ Verification

All endpoints tested and working:
- ✅ Dashboard: `http://192.168.0.24` → 200 OK
- ✅ Dobbelen: `http://192.168.0.24/dobbelen/` → 200 OK
- ✅ Quiz App: `http://192.168.0.24/quizapp/` → 200 OK
- ✅ Quiz Dev: `http://192.168.0.24/quizapp-dev/` → 200 OK
- ✅ Townsend: `http://192.168.0.24/townsend/` → 301 (redirect)
- ✅ Townsend Dev: `http://192.168.0.24/townsend-dev/` → 301 (redirect)
- ✅ ArgoCD: `http://192.168.0.24:30100/argocd/` → 200 OK

All ingresses using path-based routing (no DNS required):
```
NAMESPACE   NAME                       CLASS   HOSTS   
argocd      argocd-server-ingress      nginx   *       
default     dashboard-ingress          nginx   *       
default     dobbelen-ingress           nginx   *       
default     dobbelen-ingress-develop   nginx   *       
default     quizapp-ingress            nginx   *       
default     quizapp-ingress-develop    nginx   *       
default     townsend-ingress           nginx   *       
default     townsend-ingress-develop   nginx   *       
```

## 🎯 Key Benefits

1. **No DNS Required**: Works with IP addresses on any network
2. **Centralized Access**: Single entry point for all services
3. **Visual Hierarchy**: Clear distinction between main apps and dev branches
4. **Modern Design**: Professional, premium look and feel
5. **GitOps Ready**: All configuration in Git, managed by ArgoCD
6. **Scalable**: Easy to add new applications

## 📝 Adding New Applications

To add a new app to the dashboard:

1. **Create ingress** in `/home/vleer/infra/apps/yourapp/ingress.yaml`:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: yourapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  ingressClassName: nginx
  rules:
    - http:
        paths:
          - path: /yourapp(/|$)(.*)
            pathType: ImplementationSpecific
            backend:
              service:
                name: yourapp-service
                port:
                  number: 80
```

2. **Update dashboard** in `/home/vleer/dashboard/src/config/apps.js`:
```jsx
// src/config/apps.js
export const applications = [
  // ... existing apps
  {
    id: 'yourapp',
    name: 'Your App',
    description: 'Your app description',
    logo: null,
    paths: {
      main: '/yourapp',
      develop: '/yourapp-dev', // optional
    },
  },
];
```

3. **Deploy**: Build, push, and restart dashboard

## 🔐 Security Notes

- Dashboard and app ingresses accessible on port 80 (HTTP)
- ArgoCD exposed on port 30100
- Consider adding TLS/HTTPS for production
- ArgoCD uses HTTPS backend protocol
- CORS enabled for Quiz App

---

**Last Updated**: 2025-11-20  
**Server IP**: 192.168.0.24  
**Kubernetes**: MicroK8s  
**GitOps**: ArgoCD  
**Ingress**: Nginx Ingress Controller
