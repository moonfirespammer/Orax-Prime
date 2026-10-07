import { useState } from 'react';
import { useNavigate } from 'react-router';
import { clock } from '@/app/clock';
import { Button, Logo, Tagline } from '@/ds';
import { promptInstall } from '@/services/install';
import { useOnboarding } from '@/store/onboarding';
import { INVITE, INVITE_MIN, cleanInviteCode } from './data';
import styles from './Invite.module.css';
import { UNSORTED_FIGURE } from './unsorted';

/** The invite code (PRODUCT_SPEC §5.1): invite-only while Singapore fills in; the install prompt follows a valid code. */
export function Invite() {
  const navigate = useNavigate();
  const reset = useOnboarding((s) => s.reset);
  const [code, setCode] = useState('');
  const locked = code.length < INVITE_MIN;
  const go = () => {
    if (locked) return;
    void promptInstall(clock.city().date);
    reset();
    void navigate('/onboarding');
  };
  return (
    <main className={styles.screen} data-screen="invite">
      <div className={styles.top}>
        <Logo />
        <span className={styles.pixel}>{INVITE.eyebrow}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.unsortedRow}>
          <div role="img" aria-label={INVITE.unsorted} className={styles.unsorted} style={UNSORTED_FIGURE} />
          <span className={`${styles.pixel} ${styles.unsortedLabel}`}>{INVITE.unsortedLabel}</span>
        </div>
        <h1 className={styles.title}>{INVITE.title}</h1>
        <p className={styles.lead}>{INVITE.lead}</p>
        <input
          className={styles.input}
          value={code}
          onChange={(e) => setCode(cleanInviteCode(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') go();
          }}
          placeholder={INVITE.placeholder}
          aria-label={INVITE.placeholder}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
        />
        <p className={styles.hint}>{locked ? INVITE.hintShort : INVITE.hintReady}</p>
      </div>
      <Tagline size="md" />
      <Button block disabled={locked} onClick={go}>
        {INVITE.cta}
      </Button>
    </main>
  );
}
