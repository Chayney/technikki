import { useCreatePost } from "../../features/post/hooks/useCreatePost";
import { TitleInput } from "../../features/post/components/titleInput";
import { ContentEditor } from "../../features/post/components/contentInput";
import { CategorySelect } from "../../features/post/components/categorySelect";
import { ImageUpload } from "../../features/post/components/imageUpload";
import { SubmitButton } from "../../features/post/components/submitButton";
import { Header } from "../../shared/header/components/header";
import styles from '../../styles/post.module.css';

export default function CreatePostPage() {
    const {
        form,
        previewUrl,
        categories,
        buttonVisible,
        handleImageChange,
        handleChange,
        handleSubmit,
        setButtonVisible,
    } = useCreatePost();

    return (
        <div>
            <Header />
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>記事作成</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
                    <div className={styles.titleCategoryRow}>
                        <TitleInput
                            value={form.title}
                            onChange={(value) => handleChange("title", value)}
                        />
                        <CategorySelect
                            value={form.categoryId}
                            onChange={(value) => handleChange("categoryId", value)}
                            categories={categories}
                        />
                    </div>
                    <ImageUpload
                        previewUrl={previewUrl}
                        onChange={handleImageChange}
                        buttonVisible={buttonVisible}
                        setButtonVisible={setButtonVisible}
                    />
                    <ContentEditor
                        value={form.content}
                        onChange={(blocks) => handleChange("content", blocks)}
                    />
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}
