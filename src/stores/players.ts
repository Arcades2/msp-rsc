import { create } from "zustand";

type PlayersState = {
  currentlyPlaying: {
    id: string;
    paused: boolean;
  } | null;
  actions: {
    setCurrentlyPlaying: (postId: string) => void;
    pausePlayer: (postId: string) => void;
    resumePlayer: (postId: string) => void;
  };
};

const usePlayersStore = create<PlayersState>()((set, get) => ({
  currentlyPlaying: null,
  actions: {
    setCurrentlyPlaying(postId: string) {
      set({
        currentlyPlaying: {
          id: postId,
          paused: false,
        },
      });
    },
    resumePlayer(postId: string) {
      if (postId !== get().currentlyPlaying?.id) return;

      set((state) => ({
        currentlyPlaying: {
          id: state.currentlyPlaying!.id,
          paused: false,
        },
      }));
    },
    pausePlayer(postId: string) {
      if (postId !== get().currentlyPlaying?.id) return;

      set((state) => ({
        currentlyPlaying: {
          id: state.currentlyPlaying!.id,
          paused: true,
        },
      }));
    },
  },
}));

export const useCurrentlyPlaying = () =>
  usePlayersStore((state) => state.currentlyPlaying);

export const useIsCurrentlyPlaying = (postId: string) => {
  const currentlyPlaying = useCurrentlyPlaying();
  return postId === currentlyPlaying?.id && !currentlyPlaying.paused;
};

export const usePlayersActions = () =>
  usePlayersStore((state) => state.actions);
