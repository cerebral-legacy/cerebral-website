import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function GoingToProduction() {
  return (
    <div>
      <Markdown filename="doc_going_to_production.md" />
      <NextDocument name="boilerplates" />
    </div>
  );
}
