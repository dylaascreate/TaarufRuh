import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import MuhasabahScreen from './components/MuhasabahScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import InspirationScreen from './components/InspirationScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomeScreen },
      { path: 'onboarding', Component: OnboardingScreen },
      { path: 'home', Component: HomeScreen },
      { path: 'muhasabah', Component: MuhasabahScreen },
      { path: 'analytics', Component: AnalyticsScreen },
      { path: 'inspiration', Component: InspirationScreen },
    ],
  },
]);
