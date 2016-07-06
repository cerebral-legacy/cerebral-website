import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Servercontroller() {
  return (
    <div>
      <Markdown filename="doc_servercontroller.md" />
      <NextDocument name="context_providers" />
    </div>
  );
}
