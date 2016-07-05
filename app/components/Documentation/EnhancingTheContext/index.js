import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function EnhancingTheContext() {
  return (
    <div>
      <Markdown filename="doc_enhancing_the_context.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/modules/App/actions/addItem.js" />
      <Markdown filename="doc_enhancing_the_context_2.md" />
      <NextDocument name="data_and_ux" />
    </div>
  );
}
