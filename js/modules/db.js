/**
 * KisanMitra — IndexedDB Module
 * Handles offline storage for forms and user data.
 */

const DB_NAME = 'kisan-db';
const DB_VERSION = 1;
const STORE_FORMS = 'offline-forms';

export const DB = {
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_FORMS)) {
                    db.createObjectStore(STORE_FORMS, { keyPath: 'id' });
                }
            };
        });
    },

    async saveForm(data) {
        const db = await this.open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_FORMS, 'readwrite');
            const store = tx.objectStore(STORE_FORMS);
            const request = store.put({
                id: Date.now().toString(),
                ...data,
                timestamp: Date.now()
            });

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    },

    async getAllForms() {
        const db = await this.open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_FORMS, 'readonly');
            const store = tx.objectStore(STORE_FORMS);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async clearForms() {
        const db = await this.open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_FORMS, 'readwrite');
            const store = tx.objectStore(STORE_FORMS);
            const request = store.clear();

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
};
