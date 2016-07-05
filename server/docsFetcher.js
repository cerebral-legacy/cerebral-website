import path from 'path';
import fs from 'fs';
import request from 'request';
import externalDocs from './externalDocs';

export default function () {
  const docsToFetch = Object.keys(externalDocs).reduce((allDocs, categoryKey) => {
    return allDocs.concat(Object.keys(externalDocs[categoryKey]).reduce((allKeyedDocs, docKey) => {
      return allKeyedDocs.concat({
        category: categoryKey,
        name: 'doc_' + docKey + '.md',
        url: externalDocs[categoryKey][docKey]
      });
    }, []));
  }, []);

  return Promise.all(docsToFetch.map((doc) => {
    return new Promise((resolve, reject) => {
      request(doc.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve({
            name: doc.name,
            body: body
          })
        } else {
          reject({
            name: doc.name,
            body: 'Could not fetch...'
          })
        }
      })
    })
  }))
  .then(docs => {
    return Promise.all(docs.map((doc) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve('app', 'markdown', doc.name), doc.body, (error) => {
          if (error) {
            return reject('Failed writing file');
          }
          resolve();
        })
      });
    }));
  })
  .catch(function () {
    console.log('Failed writing files');
  })
}
