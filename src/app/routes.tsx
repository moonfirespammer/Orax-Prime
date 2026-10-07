import { createBrowserRouter } from 'react-router';
import { Gallery } from '@/dev/Gallery';
import { Board } from '@/games/bad/screens/Board';
import { Station } from '@/games/bad/screens/Station';
import { Verdict } from '@/games/bad/screens/Verdict';
import { BaselinePlay } from '@/dev/baseline/Play';
import { Invite } from '@/onboarding/Invite';
import { Onboarding } from '@/onboarding/Onboarding';
import { Digest } from '@/today/Digest';
import { Match } from '@/today/Match';
import { Quests } from '@/today/Quests';
import { Today } from '@/today/Today';
import { You } from '@/you/You';
import { CITY_NAME } from './clock';
import { Entry } from './Entry';
import { Pending } from './Pending';
import { Shell, header, tabs } from './Shell';

// Titles and captions of the sub-screen headers are the prototype's headerVals. Bodies arrive by phase (MIGRATION §6).
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Entry /> },
      // Onboarding is immersive: no tabs, no header (PRODUCT_SPEC §4).
      { path: 'invite', handle: { chrome: 'none' }, element: <Invite /> },
      { path: 'onboarding', handle: { chrome: 'none' }, element: <Onboarding /> },
      { path: 'today', handle: tabs, element: <Today /> },
      {
        path: 'today/match',
        handle: header('Today’s match', 'One a day · arrives at 00:00'),
        element: <Match />,
      },
      {
        path: 'today/quests',
        handle: header('Today’s quests', 'Pick two · the rest expire at 00:00', 'resets'),
        element: <Quests />,
      },
      {
        path: 'today/digest',
        handle: header('Today’s digest', 'Seven moments, then done'),
        element: <Digest />,
      },
      { path: 'today/wall', handle: header(`${CITY_NAME} today`, 'Wiped at 00:00'), element: <Pending /> },
      {
        path: 'today/party',
        handle: header('Your party', 'Mei at SMU · Dev at NUS · one Singapore'),
        element: <Pending />,
      },
      { path: 'today/chat', handle: header('Chat', 'Ephemeral · 7 days'), element: <Pending /> },
      {
        path: 'today/city',
        handle: header('City', `${CITY_NAME} · NUS and SMU nodes`),
        element: <Pending />,
      },
      { path: 'you', handle: tabs, element: <You /> },
      { path: 'you/wardrobe', handle: header('Wardrobe', 'Kits from the class board'), element: <Pending /> },
      { path: 'you/classes', handle: header('Change class', 'Takes effect at 00:00'), element: <Pending /> },
      // Build-A-Dish (MIGRATION §3.9): the Board, the Station named after the dish, the verdict (3c).
      {
        path: 'play/bad',
        handle: header('Today’s dishes', 'One dish a day · swap once', 'resets'),
        element: <Board />,
      },
      { path: 'play/bad/station', handle: header('', '', 'resets'), element: <Station /> },
      {
        path: 'play/bad/verdict',
        handle: header('The Bin’s verdict', '', 'resets', 'x'),
        element: <Verdict />,
      },
      { path: 'play/bad/share', handle: header('Share card', ''), element: <Pending /> },
      {
        path: 'play/hmd',
        handle: header('HMD · the last stand', 'Five cooks · one horde of 999'),
        element: <Pending />,
      },
      {
        path: 'play/oxp',
        handle: header('OXP · Table Wars', 'Three seats · ten rounds'),
        element: <Pending />,
      },
    ],
  },
  // Development pages: the component gallery and the phase 1 gate.
  { path: '/ds', element: <Gallery /> },
  { path: '/dev/baseline', element: <BaselinePlay /> },
]);
