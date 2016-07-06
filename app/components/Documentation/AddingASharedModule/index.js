import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import GithubCode from '../../GithubCode';

export default function AddingASharedModule() {
  return (
    <div>
      <Markdown filename="doc_adding_a_shared_module.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/controller.js" />
      <Markdown filename="doc_adding_a_shared_module2.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/modules/App/actions/postItem.js" />
      <Markdown filename="doc_adding_a_shared_module3.md" />
      <NextDocument name="advanced" />
    </div>
  );
}
