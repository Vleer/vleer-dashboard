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
      main: '/townsend',
      develop: '/townsend-dev',
    },
  },
];

export const operations = [
  {
    id: 'argocd',
    name: 'ArgoCD',
    description: 'GitOps continuous delivery',
    path: '/argocd',
    port: null,
    icon: '🔄',
  },
];
