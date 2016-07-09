import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';

export default function Advanced() {
  return (
    <div>
      <Markdown filename="doc_advanced.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_advanced_clone_react.md" />
      }, {
        label: 'Snabbdom',
        render: () => <Markdown filename="doc_advanced_clone_snabbdom.md" />
      }, {
        label: 'Inferno',
        render: () => <Markdown filename="doc_advanced_clone_inferno.md" />
      }]} />
      <Markdown filename="doc_advanced_2.md" />
      <NextDocument name="routing" />
    </div>
  );
}
