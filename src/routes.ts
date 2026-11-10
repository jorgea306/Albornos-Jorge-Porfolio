import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/Home.tsx'),
  route('casos/:slug', 'pages/CaseDetail.tsx'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig;
