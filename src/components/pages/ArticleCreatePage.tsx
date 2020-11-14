import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Loader } from 'rsuite';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArticleValues } from '../../api/article';
import { useCreateArticle } from '../../hooks/api/useCreateArticle';
import Field from '../form/Field';
import CategorySelector from '../form/CategorySelector';
import TagSelector from '../form/TagSelector';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import ImageUploader from '../form/ImageUploader';
import { ValidationMessages } from '../../resources/messages';
import WysiwygEditor from '../form/WysiwygEditor';

const ArticleCreatePage: FC = () => {
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
    defaultValues: {
      tags: [],
    },
  });

  const selectedCategoryId = watch('category_id');
  const selectedTagIds = watch('tags');
  const image = watch('image');
  const content = watch('content');
  useEffect(() => {
    register({ name: 'tags' });
    register({ name: 'category_id' });
    register({ name: 'image' });
    register({ name: 'content' });
  }, [register]);

  const navigate = useNavigate();
  const { createArticle } = useCreateArticle({
    onSuccess(article) {
      navigate(Paths.articleDetail(article.id));
    },
    onError(errors) {
      errors.forEach(([key, message]) => {
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
    },
  });
  const onSubmit: SubmitHandler<ArticleValues> = async (values) => {
    return createArticle(values);
  };

  return (
    <Wrapper>
      <Heading>新規記事作成</Heading>
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
          ripple={false}
        >
          送信
        </Button>
      </form>
      {isSubmitting && <Loader backdrop />}
    </Wrapper>
  );
};

export default ArticleCreatePage;

const validationSchema = Yup.object().shape<ArticleValues>({
  title: Yup.string().required(ValidationMessages.required),
  content: Yup.string().required(ValidationMessages.required),
  category_id: Yup.number().required(ValidationMessages.required),
});

const Wrapper = styled.div`
  padding: 20px;
  max-width: 780px;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 25px;
`;

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
