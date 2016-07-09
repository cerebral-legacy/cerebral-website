import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function ViewSpecificState() {
  return (
    <div>
      <Markdown filename="doc_view_specific_state.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/react/src/computed/filteredAndSortedItemKeys.js" />
      <Markdown filename="doc_view_specific_state_2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/react/src/components/Items/index.js" />
      }, {
        label: 'Snabbdom',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/snabbdom/src/components/Items/index.js" />
      }, {
        label: 'Inferno',
        render: () => <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/inferno/src/components/Items/index.js" />
      }]} />
      <Markdown filename="doc_view_specific_state_3.md" />
      <NextDocument name="get_started" />
    </div>
  );
}
