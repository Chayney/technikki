import { TitleProps } from "../types/post";
import styles from '../styles/titleInput.module.css';

export const TitleInput: React.FC<TitleProps> = ({ value, onChange }) => (
    <input className={styles.input} value={value} onChange={e => onChange(e.target.value)} placeholder="タイトル" required />
);