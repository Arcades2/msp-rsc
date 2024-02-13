import { create } from "zustand";
import invariant from "tiny-invariant";

type PlayerState = {
  playing: boolean;
};

type PlayersState = {
  playersState: Record<string, PlayerState>;
  currentlyPlaying: {
    id: string;
    playing: boolean;
  } | null;
  actions: {
    addPlayer: (postId: string, playerState?: PlayerState) => void;
    removePlayer: (postId: string) => void;
    pausePlayer: (postId: string) => void;
    playPlayer: (postId: string) => void;
    currentlyPlayingEnded: (postId: string) => void;
  };
};

const usePlayersStore = create<PlayersState>()((set) => ({
  playersState: {},
  currentlyPlaying: null,
  actions: {
    addPlayer: (postId, playerState = { playing: false }) =>
      set((state) => ({
        playersState: {
          ...state.playersState,
          [postId]: playerState,
        },
      })),
    removePlayer: (postId) =>
      set((state) => ({
        playersState: Object.keys(state.playersState).reduce<
          PlayersState["playersState"]
        >((acc, key) => {
          if (key !== postId) {
            const playerState = state.playersState[key];
            invariant(playerState, "Player state not found");
            acc[key] = playerState;
          }
          return acc;
        }, {}),
      })),
    pausePlayer(postId) {
      set((state) => ({
        playersState: {
          ...state.playersState,
          [postId]: {
            playing: false,
          },
        },
        currentlyPlaying: {
          id: postId,
          playing: false,
        },
      }));
    },
    playPlayer(postId) {
      set((state) => ({
        playersState: Object.keys(state.playersState).reduce<
          PlayersState["playersState"]
        >((acc, key) => {
          if (key === postId) {
            acc[key] = { playing: true };
          } else {
            acc[key] = { playing: false };
          }

          return acc;
        }, {}),
        currentlyPlaying: {
          id: postId,
          playing: true,
        },
      }));
    },
    currentlyPlayingEnded(postId) {
      set((state) => {
        if (!state.currentlyPlaying) return state;
        return {
          playersState: {
            ...state.playersState,
            [postId]: {
              playing: false,
            },
          },
          currentlyPlaying: {
            id: state.currentlyPlaying.id,
            playing: false,
          },
        };
      });
    },
  },
}));

export const usePlayersState = () =>
  usePlayersStore((state) => state.playersState);
export const usePlayerState = (id: string) =>
  usePlayersStore((state) => state.playersState[id] ?? { playing: false });
export const useCurrentlyPlaying = () =>
  usePlayersStore((state) => state.currentlyPlaying);
export const usePlayersActions = () =>
  usePlayersStore((state) => state.actions);
