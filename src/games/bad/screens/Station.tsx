import { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { CITY_NAME } from '@/data/cities';
import { Button } from '@/ds';
import { useShell } from '@/store/shell';
import { useToday } from '@/store/today';
import t from '@/styles/type.module.css';
import { PantryCard } from '../components/PantryCard';
import { PlateChip } from '../components/PlateChip';
import { SigilPad } from '../components/SigilPad';
import { useBadGame } from '../deps';
import { EXTRAS, ingredient } from '../engine/content/ingredients';
import type { SigilKind } from '../engine/sigils';
import { portionStyle, prepText, styleWord } from '../engine/station';
import type { Dish, Verdict } from '../engine/types';
import { useGame } from '../store';
import { STATION } from './copy';
import styles from './Station.module.css';

const BOARD_PATH = '/play/bad';
const VERDICT_PATH = '/play/bad/verdict';

/** The header names the dish while the Station is up (the prototype's headerVals for bad-station). */
function useDishHeader(d: Dish | undefined): void {
  const setHeader = useShell((s) => s.setHeader);
  const clearHeader = useShell((s) => s.clearHeader);
  useEffect(() => {
    if (!d) return;
    setHeader({ title: d.name, subtitle: d.local ?? STATION.hint });
    return clearHeader;
  }, [d, setHeader, clearHeader]);
}

/** The Station (the prototype's BaD STATION; BaD's Station for the behaviour): the plate, the sigil pad, the Pantry. */
export function Station() {
  const navigate = useNavigate();
  const ready = useBadGame();
  const board = useGame((g) => g.board);
  const pick = useGame((g) => g.pick);
  const deps = useGame((g) => g.deps);
  const plate = useGame((g) => g.plate);
  const selectedIng = useGame((g) => g.selectedIng);
  const flash = useGame((g) => g.flash);
  const plateCard = useRef<HTMLElement>(null);
  /** Set once a plate has come back: presses that land before the verdict replaces this screen are ignored. */
  const leaving = useRef(false);
  const d = board && pick ? board.dishes.find((x) => x.id === pick.dishId) : undefined;
  useDishHeader(d);
  if (!ready || !board || !deps) return <main className={styles.screen} data-screen="bad-station" />;
  if (!pick || !d) return <Navigate to={BOARD_PATH} replace />;
  const g = useGame.getState();
  const cityName = CITY_NAME[deps.city];

  const held = (id: string): number => plate.items.find((i) => i.ingredientId === id)?.n ?? 0;
  const prepOf = (id: string, extra: boolean): string => {
    const it = plate.items.find((i) => i.ingredientId === id && i.n > 0);
    return it ? prepText(it, true) : extra ? STATION.offRecipe : '';
  };
  const card = (id: string, extra = false) => (
    <PantryCard
      key={id}
      ingredientId={id}
      name={ingredient(id).name}
      units={board.stock[id] ?? 0}
      n={held(id)}
      prep={prepOf(id, extra)}
      selected={selectedIng === id && held(id) > 0}
      extra={extra}
      onAdd={() => void g.tapIngredient(id)}
      onRemove={() => void g.removeIngredient(id)}
    />
  );
  const items = plate.items.filter((i) => i.n > 0);
  const selectedItem = items.find((i) => i.ingredientId === selectedIng);
  /** A stroke or Plate it that plated the dish opens the verdict; a full plate is quest 1 (PRODUCT_SPEC §5.2). */
  const plated = (v: Verdict | null): void => {
    if (!v || leaving.current) return;
    leaving.current = true;
    const full = d.ingredients.every((id) => plate.items.some((i) => i.ingredientId === id && i.n > 0));
    if (full) useToday.getState().markDone('q1');
    void navigate(VERDICT_PATH);
  };
  const strokeNow = (kind: SigilKind, fast: boolean): void => {
    if (leaving.current) return;
    void g.stroke(kind, fast).then(plated);
  };
  const applyLine = selectedItem
    ? STATION.applyTo(ingredient(selectedItem.ingredientId).name)
    : items.length
      ? STATION.aim
      : '';

  return (
    <main className={styles.screen} data-screen="bad-station">
      <div className={styles.scroll}>
        <section ref={plateCard} tabIndex={-1} className={styles.plate} aria-label={STATION.plate}>
          <div className={styles.plateHead}>
            <span className={t.overline}>{STATION.plate}</span>
            <span className={styles.styleLabel}>
              {STATION.styleLabel(styleWord(portionStyle(items, d)), plate.flair)}
            </span>
          </div>
          <div className={styles.chips} data-testid="plate-chips">
            {items.length === 0 ? (
              <p className={t.caption}>{STATION.empty}</p>
            ) : (
              items.map((i) => (
                <PlateChip
                  key={i.ingredientId}
                  name={ingredient(i.ingredientId).name}
                  n={i.n}
                  prep={prepText(i, true)}
                  selected={selectedIng === i.ingredientId}
                  onSelect={() => {
                    g.selectItem(i.ingredientId);
                  }}
                />
              ))
            )}
          </div>
          <div className={styles.applyRow}>
            <span className={t.caption}>{applyLine}</span>
            {selectedItem ? (
              <button
                type="button"
                className={styles.fling}
                onClick={(e) => {
                  // Flinging unmounts this button: keep a keyboard user's place on the plate (detail 0 = key press).
                  if (e.detail === 0) plateCard.current?.focus();
                  void g.fling();
                }}
              >
                {STATION.fling}
              </button>
            ) : null}
          </div>
        </section>

        <SigilPad
          mess={plate.mess}
          flash={flash}
          onSigil={(sig) => {
            strokeNow(sig.kind, sig.fast);
          }}
        />
        <div className={styles.buttonsRow}>
          <div className={styles.prepButtons}>
            <Button
              variant="secondary"
              onClick={() => {
                strokeNow('cut', false);
              }}
            >
              {STATION.cut}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                strokeNow('heat', false);
              }}
            >
              {STATION.heat}
            </Button>
            {plate.mess > 0 ? (
              <Button
                variant="ghost"
                onClick={() => {
                  strokeNow('clean', false);
                }}
              >
                {STATION.wipe}
              </Button>
            ) : null}
          </div>
          <span className={`${t.caption} ${styles.buttonsHint}`}>{STATION.buttonsOrStrokes}</span>
        </div>

        <section aria-label={STATION.pantry(cityName)}>
          <div className={styles.pantryHead}>
            <span className={t.overline}>{STATION.pantry(cityName)}</span>
            <span className={`${t.caption} ${styles.capText}`}>
              {board.leftoversHour ? STATION.capOff : STATION.cap}
            </span>
          </div>
          <div className={styles.grid}>{d.ingredients.map((id) => card(id))}</div>
          {d.optional?.length ? (
            <>
              <div className={`${t.overline} ${styles.subhead}`}>{STATION.bread}</div>
              <div className={styles.grid}>{d.optional.map((id) => card(id))}</div>
            </>
          ) : null}
          <div className={`${t.overline} ${styles.subhead}`}>{STATION.extras}</div>
          <p className={`${t.caption} ${styles.extrasCaption}`}>{STATION.extrasCaption}</p>
          <div className={styles.grid4}>{EXTRAS.map((id) => card(id, true))}</div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button
          block
          onClick={() => {
            if (leaving.current) return;
            void g.plateNow().then(plated);
          }}
        >
          {STATION.plateIt}
        </Button>
        <p className={`${t.caption} ${styles.plateHint}`}>{STATION.plateHint}</p>
      </div>
    </main>
  );
}
