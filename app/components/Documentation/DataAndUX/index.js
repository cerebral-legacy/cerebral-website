import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import Tabs from '../../Tabs';
import GithubCode from '../../GithubCode';

export default function CreatingComponents() {
  return (
    <div>
      <Markdown filename="doc_data_and_ux.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/modules/App/actions/setItems.js" />
      <Markdown filename="doc_data_and_ux_2.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-advanced/blob/master/src/modules/App/actions/updateItem.js" />
      <Markdown filename="doc_data_and_ux_3.md" />
      <NextDocument name="view_specific_state" />
    </div>
  );
}
