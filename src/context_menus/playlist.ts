import { Option } from "../interfaces";

export default async () => {
  const deletePlaylist: Option = {
    label: "Delete playlist",
    critical: true,
    action: () => {
      console.log("delete playlist");
    },
  };

  const playNext: Option = {
    label: "context_menus.shared.play_next",
    action: () => {
      console.log("play next");
    },
  };

  const addToQueue: Option = {
    label: "context_menus.shared.queue",
    action: () => {
      console.log("add to queue");
    },
  };


  return [playNext, addToQueue, deletePlaylist];
};
