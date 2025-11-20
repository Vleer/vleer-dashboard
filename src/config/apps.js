export const applications = [
  {
    id: 'dobbelen',
    name: 'Dobbelen',
    description: 'A web app for rolling virtual dice and tracking results.',
    logo: '/assets/dobbelen-logo.png',
    paths: {
      main: ':30084',
      develop: ':30090',
    },
  },
  {
    id: 'quizapp',
    name: 'Quiz App',
    description: 'An interactive quiz platform for creating and taking quizzes.',
    logo: '/assets/quizapp-logo.png',
    paths: {
      main: ':30002',
      develop: ':30003',
    },
  },
  {
    id: 'townsend',
    name: 'Townsend',
    description: 'Townsend application',
    logo: null,
    paths: {
      main: ':30086',
      develop: ':30088',
    },
  },
];

export const operations = [
  {
    id: 'argocd',
    name: 'ArgoCD',
    description: 'GitOps continuous delivery',
    path: ':30100',
    port: null,
    icon: '🔄',
  },
];
