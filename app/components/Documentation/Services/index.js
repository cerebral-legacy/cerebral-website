import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Controller() {
  return (
    <div>
      <Markdown filename="doc_services.md" />
      <NextDocument name="computed" />
    </div>
  );
}
