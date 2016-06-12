import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function DefiningSignals() {
  return (
    <div>
      <Markdown filename="doc_adding_modules.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/master/src/controller.js" />
      <Markdown filename="doc_adding_modules2.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/master/src/modules/App/index.js" />
      <Markdown filename="doc_adding_modules3.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/components/App/index.js" />
      }, {
        label: 'Snabbdom',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-next/blob/snabbdom/src/components/App/index.js" />
      }]} />
      <Markdown filename="doc_adding_modules4.md" />
      <NextDocument name="creating_actions" />
    </div>
  );
}
