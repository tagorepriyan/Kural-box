import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'default' | 'palm-leaf' | 'ancient-book' | 'temple-stone' | 'wooden-box' | 'night-manuscript';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  theme: string;
  setTheme: (theme: string) => void;
  bookmarks: number[];
  toggleBookmark: (kuralNumber: number) => void;
  audioPlayer: {
    isOpen: boolean;
    currentKural: number | null;
  };
  openAudioPlayer: (kuralId: number) => void;
  closeAudioPlayer: () => void;
  // Auth state
  user: User | null;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "default",
      setTheme: (theme) => set({ theme }),
      bookmarks: [],
      toggleBookmark: (kuralNumber) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(kuralNumber)
            ? state.bookmarks.filter((id) => id !== kuralNumber)
            : [...state.bookmarks, kuralNumber],
        })),
      audioPlayer: {
        isOpen: false,
        currentKural: null,
      },
      openAudioPlayer: (kuralId) =>
        set({
          audioPlayer: { isOpen: true, currentKural: kuralId },
        }),
      closeAudioPlayer: () =>
        set((state) => ({
          audioPlayer: { ...state.audioPlayer, isOpen: false },
        })),
      user: null,
      login: () => set({ 
        user: { 
          name: "Thiruvalluvar Fan", 
          email: "scholar@kuralbox.com", 
          avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Valluvar" 
        } 
      }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'kural-box-storage',
      // We only persist themes and bookmarks
      partialize: (state) => ({ theme: state.theme, bookmarks: state.bookmarks }),
    }
  )
);
