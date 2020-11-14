import React, { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import { useUpload } from '../../hooks/api/useUpload';
import { css, Global } from '@emotion/core';
import OverlayLoader from '../core/OverlayLoader';

require.context(
  '!file-loader?name=assets/[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
  true,
  /.*/,
);

tinymce.init({
  selector: '#tiny',
});

type WysiwygEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const WysiwygEditor: FC<WysiwygEditorProps> = ({ value, onChange }) => {
  const { upload, isUploading } = useUpload();
  return (
    <>
      <Editor
        value={value}
        init={{
          height: 500,
          menubar: false,
          plugins: ['image', 'lists', 'link'],
          toolbar:
            'formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | image',
          file_picker_types: 'image',
          file_picker_callback: function (callback) {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = async () => {
              if (!input.files?.length) return;
              const filePath = await upload(input.files[0]);
              callback(filePath);
            };
            input.click();
          },
          block_formats: 'テキスト=p; 見出し=h2; 小見出し=h3',
          default_link_target: '_blank',
          target_list: false,
        }}
        onEditorChange={onChange}
      />
      {isUploading && <OverlayLoader />}
      <Global styles={globalStyle} />
    </>
  );
};

export default WysiwygEditor;

const globalStyle = css`
  .tox-tinymce {
    border-radius: 6px !important;
  }

  .tox-tinymce-aux {
    z-index: 10 !important;
  }
`;
