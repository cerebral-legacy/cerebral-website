import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function ContextProviders() {
  return (
    <div>
      <Markdown filename="doc_context_providers.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/modules/App/actions/addItem.js" />
      <Markdown filename="doc_context_providers_2.md" />
      <NextDocument name="data_and_ux" />
    </div>
  );
}
