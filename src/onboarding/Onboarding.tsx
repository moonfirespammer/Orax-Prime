import { useNavigate } from 'react-router';
import { classDesign } from '@/data/design';
import { Button, CLASSES, Chip, GEMS, GEM_ORDER, GemSocket, Logo, Tagline, asset } from '@/ds';
import { useMe } from '@/store/me';
import { useOnboarding } from '@/store/onboarding';
import { say } from '@/store/toast';
import { CITIES, GEM_TEXT, ONBOARDING, QUIZ } from './data';
import styles from './Onboarding.module.css';
import { UNSORTED_HEAD } from './unsorted';

/** The identity test, the class reveal, today's gem and the city (PRODUCT_SPEC §5.1), as the prototype's ob(). */
export function Onboarding() {
  const navigate = useNavigate();
  const step = useOnboarding((s) => s.step);
  const gem = useOnboarding((s) => s.gem);
  const city = useOnboarding((s) => s.city);
  const answer = useOnboarding((s) => s.answer);
  const next = useOnboarding((s) => s.next);
  const retake = useOnboarding((s) => s.retake);
  const pickGem = useOnboarding((s) => s.pickGem);
  const pickCity = useOnboarding((s) => s.pickCity);
  const winner = useOnboarding((s) => s.winner);
  const finishOnboarding = useMe((s) => s.finishOnboarding);
  const isQuiz = step < 5;
  const label = isQuiz
    ? ONBOARDING.stepLabels.quiz
    : step === 5
      ? ONBOARDING.stepLabels.result
      : step === 6
        ? ONBOARDING.stepLabels.gem
        : ONBOARDING.stepLabels.city;
  const q = QUIZ[Math.min(step, 4)] ?? QUIZ[0];
  const cls = winner();
  const finish = () => {
    finishOnboarding({ classKey: cls, gem, city });
    say('OraX', ONBOARDING.welcome(CLASSES[cls].name));
    void navigate('/today', { replace: true });
  };
  return (
    <main className={styles.screen} data-screen="onboarding" data-step={step}>
      <div className={styles.top}>
        <Logo />
        <span className={styles.pixel}>{label}</span>
      </div>

      {isQuiz && q ? (
        <>
          <div className={styles.body}>
            <div className={styles.whoRow}>
              <div
                role="img"
                aria-label={ONBOARDING.unsortedSmall}
                className={styles.unsortedHead}
                style={UNSORTED_HEAD}
              />
              <span className={styles.overline}>{ONBOARDING.who(step + 1)}</span>
            </div>
            <h1 className={styles.title}>{q.q}</h1>
            <div className={styles.answers}>
              {q.answers.map((a) => (
                <button key={a.text} type="button" className={styles.answer} onClick={() => answer(a.cls)}>
                  {a.text}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.dots} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`${styles.dot} ${i <= step ? styles.dotOn : ''}`} />
            ))}
          </div>
        </>
      ) : null}

      {step === 5 ? (
        <>
          <div className={styles.body}>
            <span
              role="img"
              aria-label={ONBOARDING.board(CLASSES[cls].name)}
              className={styles.board}
              style={{ backgroundImage: `url("${asset(CLASSES[cls].board)}")` }}
            />
            <div>
              <span className={styles.overline}>{ONBOARDING.youAre}</span>
              <h1
                className={styles.className}
                style={{ color: `var(--class-${cls})` }}
                data-contrast-exception="class-accent"
              >
                {CLASSES[cls].name}
              </h1>
              <p className={styles.motto}>{classDesign(cls).motto}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button block onClick={next}>
              {ONBOARDING.chooseGem}
            </Button>
            <Button variant="ghost" block onClick={retake}>
              {ONBOARDING.retake}
            </Button>
          </div>
        </>
      ) : null}

      {step === 6 ? (
        <>
          <div className={styles.body}>
            <h1 className={styles.title}>{ONBOARDING.gemTitle}</h1>
            <p className={styles.lead}>{ONBOARDING.gemLead}</p>
            <div className={styles.sockets}>
              {GEM_ORDER.map((g) => (
                <GemSocket
                  key={g}
                  gem={g}
                  size={88}
                  active={g === gem}
                  onClick={() => pickGem(g)}
                  label={`${GEMS[g].name} ${GEMS[g].role}`}
                />
              ))}
            </div>
            <div className={styles.gemCard}>
              <div className={styles.gemRow}>
                <Chip variant={gem} />
                <span className={styles.gemRole}>
                  {GEMS[gem].name} · {GEMS[gem].role}
                </span>
              </div>
              <p className={styles.gemText}>{GEM_TEXT[gem]}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <Button block onClick={next}>
              {ONBOARDING.pickCity}
            </Button>
          </div>
        </>
      ) : null}

      {step === 7 ? (
        <>
          <div className={styles.body}>
            <h1 className={styles.title}>{ONBOARDING.cityTitle}</h1>
            <p className={styles.lead}>{ONBOARDING.cityLead}</p>
            <div className={styles.cities}>
              {CITIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={c.key === city}
                  className={`${styles.cityRow} ${c.key === city ? styles.citySelected : ''}`}
                  onClick={() => pickCity(c.key)}
                >
                  <span>{c.name}</span>
                  <span className={styles.citySub}>{c.sub}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <Tagline size="md" />
            <Button block onClick={finish}>
              {ONBOARDING.start}
            </Button>
          </div>
        </>
      ) : null}
    </main>
  );
}
