import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Modules() {
  return (
    <div>
      <Markdown filename="doc_modules.md" />
      <NextDocument name="signals" />
    </div>
  );
}
