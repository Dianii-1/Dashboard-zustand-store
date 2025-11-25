import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}
interface BearStore {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];
  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  addBear: () => void;
  cleanBears: () => void;
}
export const useBearStore = create<BearStore>()((set, get) => ({
  blackBears: 10,
  pandaBears: 10,
  polarBears: 10,

  bears: [{ id: 1, name: "Oso #1" }],

  computed: {
    get totalBears() {
      return (
        get().blackBears +
        get().pandaBears +
        get().polarBears +
        get().bears.length
      );
    },
  },

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` },
      ],
    })),
  cleanBears: () => set({ bears: [] }),
}));
