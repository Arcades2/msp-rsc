"use client";

import { useCurrentlyPlaying, usePlayersActions } from "@/stores/players";
import { PiPlay, PiPause } from "react-icons/pi";
import { Button } from "@/app/_components/ui/button";

export function FooterPlayer() {
  const currentlyPlaying = useCurrentlyPlaying();
  const actions = usePlayersActions();

  if (!currentlyPlaying) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-[1px] border-t-white bg-background/95 py-4 text-center">
      {currentlyPlaying.playing ? (
        <PlayerButton onClick={() => actions.pausePlayer(currentlyPlaying.id)}>
          <PiPause />
        </PlayerButton>
      ) : (
        <PlayerButton onClick={() => actions.playPlayer(currentlyPlaying.id)}>
          <PiPlay />
        </PlayerButton>
      )}
    </div>
  );
}

type PlayerButtonProps = React.ComponentProps<typeof Button>;

function PlayerButton(props: PlayerButtonProps) {
  return (
    <Button rounded className="aspect-square p-2" {...props}>
      {props.children}
    </Button>
  );
}
