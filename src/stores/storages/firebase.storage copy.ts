/* eslint-disable no-useless-catch */
import { createJSONStorage, StateStorage } from "zustand/middleware";

const fireBaseUrl =
  "https://zustand-storage-3276d-default-rtdb.firebaseio.com/zustand";

const apiSessionStorage: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${fireBaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${fireBaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    return;
  },
  removeItem: function (name: string): void {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => apiSessionStorage);
