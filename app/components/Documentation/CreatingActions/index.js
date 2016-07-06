import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function CreatingComponents() {
  return (
    <div>
      <Markdown filename="doc_creating_actions.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/modules/App/chains/changeNewItemTitle.js" />
      <Markdown filename="doc_creating_actions2.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/modules/App/actions/addItem.js" />
      <Markdown filename="doc_creating_actions3.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/modules/App/chains/submitNewItemTitle.js" />
      <Markdown filename="doc_creating_actions4.md" />
      <NextDocument name="adding_a_shared_module" />
    </div>
  );
}
