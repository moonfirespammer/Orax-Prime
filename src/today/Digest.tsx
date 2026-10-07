import { useNavigate } from 'react-router';
import { CITY_NAME } from '@/app/clock';
import { Avatar, Button } from '@/ds';
import t from '@/styles/type.module.css';
import { digest } from './data';
import styles from './Digest.module.css';

const COPY = {
  caption: 'Seven moments a day: your party, and one from the city. When you reach the end, you are done.',
  end: "That's all for today",
  endCaption: 'Nothing more arrives until 00:00. Go and cook something.',
  back: 'Back to Today',
} as const;

/** The digest (PRODUCT_SPEC §5.6): exactly seven moments, then done. */
export function Digest() {
  const navigate = useNavigate();
  const items = digest(CITY_NAME);
  return (
    <main className={styles.screen} data-screen="digest">
      <p className={t.caption}>{COPY.caption}</p>
      {items.map((d) => (
        <div key={d.text} className={styles.item}>
          <Avatar classKey={d.person.classKey} figure={d.person.figure} size={36} ring={2} />
          <span className={styles.text}>
            <span className={styles.line}>{d.text}</span>
            <span className={styles.meta}>{d.meta}</span>
          </span>
        </div>
      ))}
      <div className={styles.end}>
        <span className={styles.endTitle}>{COPY.end}</span>
        <p className={t.caption}>{COPY.endCaption}</p>
        <Button variant="ghost" onClick={() => void navigate('/today')}>
          {COPY.back}
        </Button>
      </div>
    </main>
  );
}
