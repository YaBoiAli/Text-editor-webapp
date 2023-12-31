import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Implement a method that adds content to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({
    id: 1,
    value: content
  })
  const result = await request;
  console.log("data saved! ", result?.value);
};

// Implement a method that gets all content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.get(1);
  const request = await content;
  return request?.value;
};

initdb();
