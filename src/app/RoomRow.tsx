import { Icon, type IconName } from '@/ds';
import styles from './RoomRow.module.css';

export interface Room {
  key: 'bad' | 'hmd' | 'oxp' | 'city';
  icon: IconName;
  title: string;
  caption: string;
  tag: string;
  to: string;
}

/** One of tonight's four rooms: icon, title, caption with the party state, a pixel tag (PRODUCT_SPEC §5.2). */
export function RoomRow({
  room,
  onOpen,
  ground = 'raised',
  chevron = false,
}: {
  room: Room;
  onOpen: (room: Room) => void;
  /** Raised on Today; the base surface inside the Play sheet, which is itself raised. */
  ground?: 'raised' | 'surface';
  chevron?: boolean;
}) {
  return (
    <button type="button" className={`${styles.row} ${styles[ground]}`} onClick={() => onOpen(room)}>
      <span className={styles.icon}>
        <Icon name={room.icon} size={24} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{room.title}</span>
        <span className={styles.caption}>{room.caption}</span>
      </span>
      <span className={styles.tag}>{room.tag}</span>
      {chevron ? (
        <span className={styles.chevron}>
          <Icon name="chevron-right" size={20} />
        </span>
      ) : null}
    </button>
  );
}
