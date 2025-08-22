import Image from "next/image";
import { ImageProps } from "../types/post";
import styles from "../styles/imageUpload.module.css";

export const ImageUpload: React.FC<ImageProps> = ({
    previewUrl,
    onChange,
    buttonVisible,
}) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const triggerFileInput = () => {
        const input = document.getElementById("hidden-file-input") as HTMLInputElement;
        input?.click();
    };

    return (
        <div className={styles.previewContainer}>
            <input
                id="hidden-file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleInput}
            />

            {previewUrl ? (
                <Image
                    src={previewUrl}
                    alt="選択画像"
                    width={800}
                    height={300}
                    className={styles.previewImage}
                    unoptimized
                    priority
                />
            ) : (
                buttonVisible && (
                    <button type="button" className={styles.uploadButton} onClick={triggerFileInput}>
                        画像を選択する
                    </button>
                )
            )}
        </div>
    );
};
