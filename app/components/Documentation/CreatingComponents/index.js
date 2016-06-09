import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';

export default function CreatingComponents() {
  return (
    <div>
      <Markdown filename="doc_creating_components.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_creating_components_react.md" />
      }, {
        label: 'Inferno',
        render: () => <Markdown filename="doc_creating_components_inferno.md" />
      }]} />
      <Markdown filename="doc_creating_components2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_creating_components_react2.md" />
      }]} />
      <Markdown filename="doc_creating_components3.md" />
      <NextDocument name="adding_modules" />
    </div>
  );
}
