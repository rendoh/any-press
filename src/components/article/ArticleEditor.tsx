import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Toggle } from 'rsuite';
import { ArticleValues, createArticle, updateArticle } from '../../api/article';
import Field from '../form/Field';
import ImageUploader from '../form/ImageUploader';
import { ValidationMessages } from '../../resources/messages';
import CategorySelector from '../form/CategorySelector';
import TagSelector from '../form/TagSelector';
import WysiwygEditor from '../form/WysiwygEditor';
import { ArticleDetail } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';
import { ApiError } from '../../api/ApiError';
import { Paths } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';

export type ArticleEditorProps = {
  articleDetail?: ArticleDetail;
};

const ArticleEditor: FC<ArticleEditorProps> = ({ articleDetail }) => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    formState: { isSubmitting },
  } = useForm<ArticleValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
    defaultValues: articleDetail
      ? convertArticleToFormValues(articleDetail)
      : {},
  });
  const selectedCategoryId = watch('category_id');
  const selectedTagIds = watch('tags');
  const image = watch('image');
  const content = watch('content');
  const isPublic = watch('public');

  useEffect(() => {
    register({ name: 'tags' });
    register({ name: 'category_id' });
    register({ name: 'image' });
    register({ name: 'content' });
    register({ name: 'public' });
  }, [register]);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ArticleValues> = async (values) => {
    try {
      const { data } = await (articleDetail
        ? updateArticle(articleDetail.id, values)
        : createArticle(values));
      navigate(Paths.articleDetail(data.id));
    } catch (error: unknown) {
      handleApiError(error);
      if (error instanceof ApiError) {
        error
          .getFieldErrorEntries([
            'title',
            'image',
            'content',
            'category_id',
            'tags',
          ])
          .forEach(([key, message]) => {
            if (key === 'tags') {
              setError('tags.0', {
                message,
              });
            } else {
              setError(key, {
                message,
              });
            }
          });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="タイトル" htmlFor="title" error={errors.title?.message}>
          <Input id="title" name="title" inputRef={register} type="text" />
        </Field>
        <FieldRow>
          <FieldColumn>
            <Field label="メインビジュアル" htmlFor="image">
              <FileUploader
                name="image"
                image={image}
                onSuccess={(filePath) => {
                  setValue('image', filePath);
                }}
                onRemove={() => {
                  setValue('image', '');
                }}
              />
            </Field>
          </FieldColumn>
          <FieldColumn>
            <Field
              label="カテゴリ"
              htmlFor="category"
              error={errors.category_id?.message}
            >
              <CategorySelector
                id="category"
                onChange={(value) => setValue('category_id', value)}
                value={selectedCategoryId}
              />
            </Field>
            <Field
              label="タグ"
              htmlFor="tags"
              error={errors.tags?.length ? errors.tags[0]?.message : undefined}
            >
              <TagSelector
                id="tags"
                onChange={(values) => setValue('tags', values)}
                value={selectedTagIds}
              />
            </Field>
            <Field label="公開状態" htmlFor="public">
              <Toggle
                id="public"
                checked={isPublic}
                onChange={(checked) => setValue('public', checked)}
                size="lg"
                checkedChildren="公開"
                unCheckedChildren="非公開"
              />
            </Field>
          </FieldColumn>
        </FieldRow>
        <Field
          label="記事内容"
          htmlFor="content"
          error={errors.content?.message}
        >
          <WysiwygEditor
            value={content}
            onChange={(value) => setValue('content', value)}
          />
        </Field>
        <Button
          type="submit"
          appearance="primary"
          disabled={isSubmitting}
          loading={isSubmitting}
          ripple={false}
        >
          送信
        </Button>
      </form>
    </>
  );
};

export default ArticleEditor;

const convertArticleToFormValues = ({
  title,
  image,
  content,
  category,
  tags,
  public: isPublic,
}: ArticleDetail): ArticleValues => ({
  title,
  image,
  content,
  category_id: category.id,
  tags: tags.map(({ id }) => id),
  public: isPublic,
});

const validationSchema = Yup.object().shape<ArticleValues>({
  title: Yup.string().required(ValidationMessages.required),
  content: Yup.string().required(ValidationMessages.required),
  category_id: Yup.number().required(ValidationMessages.required),
  public: Yup.bool(),
});

const FileUploader = styled(ImageUploader)`
  width: 100%;
  height: auto;
  min-height: 200px;
  @media (min-width: 600px) {
    height: 210px;
  }
`;

const FieldRow = styled.div`
  @media (min-width: 600px) {
    display: flex;
  }
`;

const FieldColumn = styled.div`
  @media (min-width: 600px) {
    flex: 1;
    &:nth-of-type(2n) {
      margin-left: 20px;
    }
  }
`;
