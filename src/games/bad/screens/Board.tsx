import { useNavigate } from 'react-router';
import { CITY_NAME } from '@/data/cities';
import { Avatar, Button, Chip } from '@/ds';
import t from '@/styles/type.module.css';
import { useBadGame } from '../deps';
import { COPY, fill } from '../engine/content/copy';
import { dishLower } from '../engine/content/dishes';
import { boardCta, dishStockState } from '../engine/pool';
import type { DayBoard, Dish } from '../engine/types';
import { useGame } from '../store';
import { BOARD } from './copy';
import styles from './Board.module.css';

function DishCard({
  d,
  board,
  selected,
  picked,
  onSelect,
}: {
  d: Dish;
  board: DayBoard;
  selected: boolean;
  picked: boolean;
  onSelect: () => void;
}) {
  const st = dishStockState(d.id, board.stock);
  const count = board.counts[d.id] ?? 0;
  const cooks = board.cooks[d.id] ?? [];
  const cls = [styles.dish, selected ? styles.dishSelected : '', selected && !picked ? styles.dishTinted : '']
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={cls} aria-pressed={selected} onClick={onSelect}>
      <div className={styles.dishTop}>
        <div className={styles.dishText}>
          <div className={t.headingSm}>{d.name}</div>
          {d.local ? <div className={t.caption}>{d.local}</div> : null}
        </div>
        {picked ? <Chip>{BOARD.cookingToday}</Chip> : null}
      </div>
      <div className={styles.dishBottom}>
        <span className={styles.stock} data-stock={st}>
          {COPY.board.stock[st]}
        </span>
        <span className={styles.cooks}>
          <span className={styles.avatars}>
            {cooks.slice(0, 3).map((c, i) => (
              <Avatar
                key={i}
                classKey={c.classKey}
                figure={c.figure}
                size={24}
                ring={2}
                surfaceRing={2}
                className={styles.avatar}
              />
            ))}
          </span>
          <span className={t.bodyStrong}>{count}</span>
          <span className={t.caption}>{BOARD.cooking}</span>
        </span>
      </div>
    </button>
  );
}

/** Today's dishes (the prototype's BaD BOARD; BaD's Board for the behaviour): one pick a day, one swap. */
export function Board() {
  const navigate = useNavigate();
  const ready = useBadGame();
  const board = useGame((g) => g.board);
  const pick = useGame((g) => g.pick);
  const profile = useGame((g) => g.profile);
  const selected = useGame((g) => g.selectedDish);
  const deps = useGame((g) => g.deps);
  const busy = useGame((g) => g.busy);
  const selectDish = useGame((g) => g.selectDish);
  const pickSelected = useGame((g) => g.pickSelected);
  const swapToSelected = useGame((g) => g.swapToSelected);
  if (!ready || !board || !deps || !profile)
    return <main className={styles.screen} data-screen="bad-board" />;
  const cityName = CITY_NAME[deps.city];
  const cta = boardCta(pick?.dishId ?? null, selected, pick?.swapsLeft ?? 1);
  const ctaDish = 'dishId' in cta ? board.dishes.find((d) => d.id === cta.dishId) : undefined;
  const ctaLabel =
    cta.kind === 'pick'
      ? COPY.board.cta.pick
      : cta.kind === 'noSwaps'
        ? COPY.board.cta.noSwaps
        : fill(COPY.board.cta[cta.kind], { dish: ctaDish ? dishLower(ctaDish) : '' });
  const onCta = (): void => {
    if (cta.kind === 'pickDish') void pickSelected();
    else if (cta.kind === 'swap') void swapToSelected();
    else if (cta.kind === 'cook') void navigate('/play/bad/station');
  };
  const pickedDish = pick ? board.dishes.find((d) => d.id === pick.dishId) : undefined;
  return (
    <main className={styles.screen} data-screen="bad-board">
      <div className={styles.scroll}>
        <div className={styles.top}>
          <p className={t.caption}>{BOARD.caption(cityName)}</p>
          <span className={styles.cursed}>{BOARD.cursed(profile.cursedPlates.length)}</span>
        </div>
        {board.leftoversHour ? (
          <div className={styles.leftovers}>
            <span className={styles.leftoversLabel}>{BOARD.leftoversLabel}</span>
            <span className={t.caption}>{BOARD.leftoversCaption}</span>
          </div>
        ) : null}
        {pickedDish ? (
          <p className={styles.youAreIn}>
            {BOARD.youAreIn(board.counts[pickedDish.id] ?? 0, dishLower(pickedDish))}
          </p>
        ) : null}
        {board.dishes.map((d) => (
          <DishCard
            key={d.id}
            d={d}
            board={board}
            selected={selected === d.id}
            picked={pick?.dishId === d.id}
            onSelect={() => {
              selectDish(d.id);
            }}
          />
        ))}
        <p className={styles.footer}>{BOARD.footer(board.binEaten.toLocaleString('en-SG'), cityName)}</p>
      </div>
      <div className={styles.cta}>
        <Button block disabled={cta.disabled || busy} onClick={onCta}>
          {ctaLabel}
        </Button>
      </div>
    </main>
  );
}
