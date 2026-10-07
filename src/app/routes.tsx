import { Navigate, createBrowserRouter } from 'react-router';
import { Gallery } from '@/dev/Gallery';
import { BaselinePlay } from '@/dev/baseline/Play';
import { Today } from '@/today/Today';
import { You } from '@/you/You';
import { CITY_NAME } from './clock';
import { Pending } from './Pending';
import { Shell, header, tabs } from './Shell';

// Titles and captions of the sub-screen headers are the prototype's headerVals. Bodies arrive by phase (MIGRATION §6).
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Navigate to="/today" replace /> },
      { path: 'today', handle: tabs, element: <Today /> },
      {
        path: 'today/match',
        handle: header('Today’s match', 'One a day · arrives at 00:00'),
        element: <Pending />,
      },
      {
        path: 'today/quests',
        handle: header('Today’s quests', 'Pick two · the rest expire at 00:00', 'resets'),
        element: <Pending />,
      },
      {
        path: 'today/digest',
        handle: header('Today’s digest', 'Seven moments, then done'),
        element: <Pending />,
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
      {
        path: 'play/bad',
        handle: header('Today’s dishes', 'One dish a day · swap once', 'resets'),
        element: <Pending />,
      },
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
