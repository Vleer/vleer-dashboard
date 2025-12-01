export const applications = [
  {
    id: 'dobbelen',
    name: 'Dobbelen',
    description: 'A web app for rolling virtual dice and tracking results.',
    logo: '/assets/dobbelen-logo.png',
    paths: {
      main: '/dobbelen',
      develop: '/dobbelen-dev',
    },
  },
  {
    id: 'quizapp',
    name: 'Quiz App',
    description: 'An interactive quiz platform for creating and taking quizzes.',
    logo: '/assets/quizapp-logo.png',
    paths: {
      main: '/quizapp',
      develop: '/quizapp-dev',
    },
  },
  {
    id: 'townsend',
    name: 'Townsend',
    description: 'Townsend application',
    logo: null,
    paths: {
      main: 'http://192.168.0.24:32080/client/index.html',
      develop: 'http://192.168.0.24:32090/client/index.html',
    },
  },
  {
    id: 'lights',
    name: 'Lights',
    description: 'WiZ smart bulb controller for home lighting automation.',
    logo: null,
    paths: {
      main: '/lights',
      develop: null,
    },
  },
  {
    id: 'todo',
    name: 'Todo App',
    description: 'Task management and to-do list application.',
    logo: null,
    paths: {
      main: 'http://192.168.0.24:3000',
      develop: null,
    },
  },
];

export const operations = [
  {
    id: 'argocd',
    name: 'ArgoCD',
    description: 'GitOps continuous delivery',
    path: 'http://192.168.0.24:30080',
    port: null,
    icon: '🔄',
  },
  {
    id: 'traefik',
    name: 'Traefik Dashboard',
    description: 'Ingress controller & routing',
    path: 'http://192.168.0.24:9000/dashboard/',
    port: null,
    icon: '🚦',
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    description: 'Metrics and monitoring',
    path: 'http://192.168.0.24:9090',
    port: null,
    icon: '📊',
  },
  {
    id: 'registry',
    name: 'Container Registry',
    description: 'Local Docker image registry',
    path: 'http://192.168.0.24:32000',
    port: null,
    icon: '📦',
  },
];
