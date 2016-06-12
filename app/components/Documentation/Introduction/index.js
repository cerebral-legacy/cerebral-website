import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';

export default function Introduction() {
  return (
    <div>
      <Markdown filename="doc_introduction.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_introduction_clone_react.md" />
      }, {
        label: 'Snabbdom',
        render: () => <Markdown filename="doc_introduction_clone_snabbdom.md" />
      }]} />
      <Markdown filename="doc_introduction_2.md" />
      <NextDocument name="structuring_state" />
    </div>
  );
}
