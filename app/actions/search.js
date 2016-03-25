import menu from '../menu';

function search({input, state}) {
  const query = input.query;

  const searchResults = menu.reduce((results, item) => {
    const extractHits = (currentItem) => {
      if (!currentItem.text) {
        return;
      }
      const hits = currentItem.text.toLowerCase().match(new RegExp(query.toLowerCase(), 'g'));

      if (hits && hits.length) {
        results.push({
          hitsCount: hits.length,
          label: currentItem.label,
          parent: item === currentItem ? null : item.label.toLowerCase()
        });
      }
    };

    extractHits(item);

    if (item.subContent) {
      item.subContent.forEach(extractHits);
    }

    return results;
  }, []);

  searchResults.sort((a, b) => {
    if (a.hitsCount > b.hitsCount) {
      return -1;
    }

    if (a.hitsCount < b.hitsCount) {
      return 1;
    }

    return 0;
  });

  state.set('searchResults', searchResults)
}

export default search;
