import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { JSONFilePreset } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class DB {
  constructor(configuration = {}) {
    const {
      pathToDbStorage = `${join(__dirname, '..')}/db.json`,
    } = configuration;

    if (!pathToDbStorage) throw new Error('missing path to db storage');

    this.configuration = configuration;
    Object.freeze(this.configuration);

    this._isAlreadyInitialized = false;
    this._isDbReady = false;
    this._db = this.initialize(pathToDbStorage);
  }

  initialize(pathToDbStorage) {
    return new Promise((resolve, reject) => {
      if (this._isAlreadyInitialized) {
        reject('db already initialized');
      }
      this._isAlreadyInitialized = true;
      const defaultData = { worlds: [] };
      JSONFilePreset(pathToDbStorage, defaultData)
        .then(db => {
          // console.log(`db.update: ${typeof db.update}`);
          this._isDbReady = true;
          resolve(db);
        });
    });
  }

  get db() {
    return this._db;
  }
}
