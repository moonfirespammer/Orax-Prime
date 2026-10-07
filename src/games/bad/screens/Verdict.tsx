import { Navigate, useNavigate } from 'react-router';
import { Button, Chip, GEMS, GemSocket, type ChipProps } from '@/ds';
import { useMe } from '@/store/me';
import { say } from '@/store/toast';
import t from '@/styles/type.module.css';
import { useBadGame } from '../deps';
import { dish, dishLower } from '../engine/content/dishes';
import type { Verdict as VerdictData } from '../engine/types';
import { useGame } from '../store';
import { VERDICT } from './copy';
import styles from './Verdict.module.css';

const BOARD_PATH = '/play/bad';
const SHARE_PATH = '/play/bad/share';
const WALL_PATH = '/today/wall';

/** The Bin's pose for the art slot: disgusted on a cursed plate, approving at three stones, judging at two. */
export const poseOf = (v: Pick<VerdictData, 'cursed' | 'stones'>): string =>
  v.cursed ? 'disgusted' : v.stones === 3 ? 'approving' : v.stones === 2 ? 'judging' : 'neutral';

interface VerdictChip {
  label: string;
  appearance: NonNullable<ChipProps['appearance']>;
  variant: NonNullable<ChipProps['variant']>;
}

/** The chips under the stones: the style, the habit, the palate, Leftovers hour, and Cursed plate in ruby outline. */
export function chipsOf(v: VerdictData): VerdictChip[] {
  const subtle = (label: string): VerdictChip => ({ label, appearance: 'subtle', variant: 'brand' });
  return [
    subtle(v.style),
    subtle(v.habit),
    ...(v.palate ? [subtle(v.palate.chip)] : []),
    ...(v.leftoversUsed ? [subtle(VERDICT.leftovers)] : []),
    ...(v.cursed
      ? [{ label: VERDICT.cursedChip, appearance: 'outline' as const, variant: 'ruby' as const }]
      : []),
  ];
}

/** The Bin's verdict (the prototype's BaD VERDICT on BaD's judge): the line, the name, the stones, the chips. */
export function Verdict() {
  const navigate = useNavigate();
  const ready = useBadGame();
  const verdict = useGame((g) => g.verdict);
  const profile = useGame((g) => g.profile);
  const deps = useGame((g) => g.deps);
  const setSignature = useGame((g) => g.setSignature);
  const gem = useMe((s) => s.me.gem);
  if (!ready || !deps) return <main className={styles.screen} data-screen="bad-verdict" />;
  if (!verdict) return <Navigate to={BOARD_PATH} replace />;
  const lower = dishLower(dish(verdict.dishId));
  const isSignature = profile?.signature?.name === verdict.name;
  const keep = (): void => {
    void setSignature().then(() => {
      say('You', VERDICT.signatureToast);
    });
  };
  return (
    <main className={styles.screen} data-screen="bad-verdict">
      <div className={styles.bin}>{VERDICT.pose(poseOf(verdict))}</div>
      <section className={styles.card} aria-label={VERDICT.bin}>
        <span className={t.overline}>{VERDICT.bin}</span>
        <p className={styles.line}>{verdict.line}</p>
        {verdict.palate ? <p className={styles.palate}>{verdict.palate.line}</p> : null}
      </section>
      <div className={styles.naming}>
        {verdict.cursed ? <div className={styles.cursed}>{VERDICT.cursed(lower)}</div> : null}
        <h2 className={styles.name}>{verdict.name}</h2>
        <p className={styles.label}>{verdict.label}</p>
      </div>
      <div className={styles.stones}>
        <div className={styles.sockets}>
          {[1, 2, 3].map((k) => (
            <GemSocket key={k} gem={gem} size={56} active={k <= verdict.stones} decorative />
          ))}
        </div>
        <span className={t.caption}>{VERDICT.stones(verdict.stones, GEMS[gem].plural)}</span>
      </div>
      <div className={styles.chips}>
        {chipsOf(verdict).map((c) => (
          <Chip key={c.label} appearance={c.appearance} variant={c.variant}>
            {c.label}
          </Chip>
        ))}
      </div>
      <div className={styles.actions}>
        <Button block onClick={() => void navigate(SHARE_PATH)}>
          {VERDICT.share}
        </Button>
        <Button variant="secondary" block done={isSignature} onClick={keep}>
          {isSignature ? VERDICT.signatureSet : VERDICT.setSignature}
        </Button>
        <Button variant="ghost" block onClick={() => void navigate(WALL_PATH)}>
          {VERDICT.seeOthers(lower)}
        </Button>
      </div>
    </main>
  );
}
