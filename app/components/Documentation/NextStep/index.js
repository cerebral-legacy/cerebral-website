import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';

export default function NextStep() {
  return (
    <div>
      <Markdown filename="doc_next_step.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_next_step_clone_react.md" />
      }, {
        label: 'Snabbdom',
        render: () => <Markdown filename="doc_next_step_clone_snabbdom.md" />
      }]} />
      <Markdown filename="doc_next_step_2.md" />
      <NextDocument name="adding_modules" />
    </div>
  );
}
