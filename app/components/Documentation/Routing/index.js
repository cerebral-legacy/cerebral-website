import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function Introduction() {
  return (
    <div>
      <Markdown filename="doc_routing.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/controller.js" />
      <Markdown filename="doc_routing_2.md" />
      <Tabs tabs={[{
        label: 'React',
        render: () => <Markdown filename="doc_routing_page_react.md" />
      }, {
        label: 'Snabbdom',
        render: () => <Markdown filename="doc_routing_page_snabbdom.md" />
      }]} />
      <Markdown filename="doc_routing_3.md" />
      <NextDocument name="creating_a_service" />
    </div>
  );
}
