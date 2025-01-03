import * as icons from "@/icons";
import { ContextSrc } from "@/enums";
import { Option, Playlist } from "@/interfaces";
import { getTracksInPath } from "@/requests/folders";

import useModal from "@/stores/modal";
import useTracklist from "@/stores/queue/tracklist";

import { addFolderToPlaylist } from "@/requests/playlists";
import { getAddToPlaylistOptions } from "./utils";

export default async (path: string) => {
  const modal = useModal();

  const play_next = <Option>{
    label: "context_menus.shared.play_next",
    action: () => {
      getTracksInPath(path).then((tracks) => {
        const store = useTracklist();
        store.insertAfterCurrent(tracks);
      });
    },
    icon: icons.PlayNextIcon,
  };

  const add_to_queue = <Option>{
    label: "context_menus.shared.queue",
    action: () => {
      getTracksInPath(path).then((tracks) => {
        const store = useTracklist();
        store.addTracks(tracks);
      });
    },
    icon: icons.AddToQueueIcon,
  };

  // Action for each playlist option
  const AddToPlaylistAction = (playlist: Playlist) => {
    addFolderToPlaylist(playlist, path);
  };

  const add_to_playlist = <Option>{
    label: "context_menus.shared.add_to_playlist",
    children: await getAddToPlaylistOptions(AddToPlaylistAction, {
      path,
    }),
    icon: icons.PlusIcon,
  };

  const save_as_playlist = <Option>{
    label: "context_menus.shared.save_as_playlist",
    action: () => modal.showSaveFolderAsPlaylistModal(path),
    icon: icons.PlaylistIcon,
  };

  return [play_next, add_to_queue, add_to_playlist, save_as_playlist];
};
