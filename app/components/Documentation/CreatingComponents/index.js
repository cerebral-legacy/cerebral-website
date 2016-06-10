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
        render: () => <GithubCode url="https://raw.githubusercontent.com/cerebral/cerebral-website-tutorial/react/src/components/App/index.js" />
      }, {
        label: 'Inferno',
        render: () => <Markdown filename="doc_creating_components_inferno.md" />
      }]} />
      <Markdown filename="doc_creating_components2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <GithubCode url="https://raw.githubusercontent.com/cerebral/cerebral-website-tutorial/react/src/main.js" />
      }]} />
      <Markdown filename="doc_creating_components3.md" />
      <NextDocument name="adding_modules" />
    </div>
  );
}
