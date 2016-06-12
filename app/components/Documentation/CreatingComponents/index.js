import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function CreatingComponents() {
  return (
    <div>
      <Markdown filename="doc_creating_components.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/react/src/components/App/index.js" />
      }, {
        label: 'Snabbdom',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/snabbdom/src/components/App/index.js" />
      }]} />
      <Markdown filename="doc_creating_components2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/react/src/main.js" />
      }, {
        label: 'Snabbdom',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/snabbdom/src/main.js" />
      }]} />
      <Markdown filename="doc_creating_components3.md" />
      <NextDocument name="next_step" />
    </div>
  );
}
