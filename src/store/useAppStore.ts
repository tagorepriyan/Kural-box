import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'default' | 'palm-leaf' | 'ancient-book' | 'temple-stone' | 'wooden-box' | 'night-manuscript';

interface AppState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  bookmarks: number[];
  toggleBookmark: (kuralId: number) => void;
  audioPlayer: {
    isOpen: boolean;
    currentKural: number | null;
  };
  openAudioPlayer: (kuralId: number) => void;
  closeAudioPlayer: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'default',
      setTheme: (theme) => set({ theme }),
      bookmarks: [],
      toggleBookmark: (kuralId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(kuralId)
            ? state.bookmarks.filter((id) => id !== kuralId)
            : [...state.bookmarks, kuralId],
        })),
      audioPlayer: {
        isOpen: false,
        currentKural: null,
      },
      openAudioPlayer: (kuralId) =>
        set((state) => ({
          audioPlayer: { ...state.audioPlayer, isOpen: true, currentKural: kuralId },
        })),
      closeAudioPlayer: () =>
        set((state) => ({
          audioPlayer: { ...state.audioPlayer, isOpen: false, currentKural: null },
        })),
    }),
    {
      name: 'kural-box-storage',
      // We only persist themes and bookmarks
      partialize: (state) => ({ theme: state.theme, bookmarks: state.bookmarks }),
    }
  )
);
