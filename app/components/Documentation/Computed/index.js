import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function Computed() {
  return (
    <div>
      <Markdown filename="doc_computed.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/computed/filteredItems.js" />
      <Markdown filename="doc_computed_2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/react/src/components/Items/index.js" />
      }, {
        label: 'Snabbdom',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/snabbdom/src/components/Items/index.js" />
      }]} />
      <Markdown filename="doc_computed_3.md" />
      <NextDocument name="get_started" />
    </div>
  );
}
