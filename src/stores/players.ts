import { create } from "zustand";

type PlayerState = {
  playing: boolean;
};

type PlayersState = {
  playersState: Map<string, PlayerState>;
  currentlyPlaying: {
    id: string;
    playing: boolean;
  } | null;
  actions: {
    addPlayer: (postId: string, playerState?: PlayerState) => void;
    removePlayer: (postId: string) => void;
    pausePlayer: (postId: string) => void;
    playPlayer: (postId: string) => void;
  };
};

const usePlayersStore = create<PlayersState>()((set, get) => ({
  playersState: new Map<string, PlayerState>(),
  currentlyPlaying: null,
  actions: {
    addPlayer: (postId, playerState = { playing: false }) => {
      set((state) => ({
        playersState: structuredClone(state.playersState).set(
          postId,
          playerState,
        ),
      }));
    },
    removePlayer: (postId) => {
      const newPlayerState = structuredClone(get().playersState);
      newPlayerState.delete(postId);

      set({
        playersState: newPlayerState,
      });
    },
    pausePlayer(postId) {
      const newPlayersState = structuredClone(get().playersState);

      const post = newPlayersState.get(postId);

      if (!post) return;

      post.playing = false;

      set({
        playersState: newPlayersState,
        currentlyPlaying: {
          id: postId,
          playing: false,
        },
      });
    },
    playPlayer(postId) {
      const newPlayersState = structuredClone(get().playersState);

      newPlayersState.forEach((_, key, map) => {
        if (key === postId) {
          map.set(key, {
            playing: true,
          });
        } else {
          map.set(key, {
            playing: false,
          });
        }
      });

      set({
        playersState: newPlayersState,
        currentlyPlaying: {
          id: postId,
          playing: true,
        },
      });
    },
  },
}));

export const usePlayersState = () =>
  usePlayersStore((state) => state.playersState);
export const usePlayerState = (id: string) =>
  usePlayersStore((state) => state.playersState.get(id) ?? { playing: false });
export const useCurrentlyPlaying = () =>
  usePlayersStore((state) => state.currentlyPlaying);
export const usePlayersActions = () =>
  usePlayersStore((state) => state.actions);
