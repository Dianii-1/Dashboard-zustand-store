import { create, StateCreator } from "zustand";
import { createJSONStorage, StateStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
});

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    console.log("getItem", name);
    return null;
  },
  setItem: function (name: string, value: string): void {
    console.log("setItem", { name, value });
  },
  removeItem: function (name: string): void {
    console.log("removeItem", name);
  },
};
export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, {
    name: "person-store",
    storage: createJSONStorage(() => sessionStorage),
  })
);
