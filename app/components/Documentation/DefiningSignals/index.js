import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import GithubCode from '../../GithubCode';

export default function DefiningSignals() {
  return (
    <div>
      <Markdown filename="doc_defining_signals.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/master/src/controller.js" />
      <Markdown filename="doc_defining_signals2.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/master/src/signals/newItemTitleChanged.js" />
      <Markdown filename="doc_defining_signals3.md" />
      <NextDocument name="creating_components" />
    </div>
  );
}
