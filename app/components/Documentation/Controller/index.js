import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Controller() {
  return (
    <div>
      <Markdown filename="doc_controller.md" />
      <NextDocument name="signals" />
    </div>
  );
}
