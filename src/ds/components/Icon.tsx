import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Flame,
  History,
  ListChecks,
  MapPin,
  MessageCircle,
  Minus,
  Play,
  Send,
  Settings,
  Shirt,
  Sparkles,
  Sun,
  Swords,
  User,
  Utensils,
  X,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

// No icon set came with the brand: Lucide outline glyphs are the interim set (design system: Icon), every one a
// placeholder until a house set is drawn. The names are the ones the prototype uses, by kebab-case name.
const ICONS = {
  'arrow-left': ArrowLeft,
  bell: Bell,
  check: Check,
  'chevron-right': ChevronRight,
  flame: Flame,
  history: History,
  'list-checks': ListChecks,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  minus: Minus,
  play: Play,
  send: Send,
  settings: Settings,
  shirt: Shirt,
  sparkles: Sparkles,
  sun: Sun,
  swords: Swords,
  user: User,
  utensils: Utensils,
  x: X,
} satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

/** A Lucide outline icon at 1.5 px stroke in currentColor: 20 px inside controls, 24 px in navigation. Decorative unless labelled. */
export function Icon({ name, size = 20, label }: { name: IconName; size?: number; label?: string }) {
  const C = ICONS[name];
  return (
    <C
      size={size}
      strokeWidth={1.5}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      style={{ flex: 'none', display: 'block' }}
    />
  );
}
