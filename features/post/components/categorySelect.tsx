import { CategoriesProps } from "../types/post";
import styles from '../styles/categorySelect.module.css';

export const CategorySelect: React.FC<CategoriesProps> = ({ value, onChange, categories }) => (
    <select className={styles.select} value={value} onChange={e => onChange(e.target.value)} required>
        <option value="">カテゴリを選択</option>
        {categories.map(c => (
            <option key={c.id} value={c.id}>
                {c.name}
            </option>
        ))}
    </select>
);