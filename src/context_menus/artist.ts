import modal from "@/stores/modal";
import useTracklist from "@/stores/queue/tracklist";

import { getArtistTracks } from "@/requests/artists";
import { addArtistToPlaylist } from "@/requests/playlists";

import { Option, Playlist } from "@/interfaces";
import { getAddToPlaylistOptions, get_find_on_social } from "./utils";
import { AddToQueueIcon, PlayNextIcon, PlaylistIcon, PlusIcon } from "@/icons";

export default async (artisthash: string, artistname: string) => {
  const play_next = <Option>{
    label: "context_menus.shared.play_next",
    action: () => {
      getArtistTracks(artisthash).then((tracks) => {
        const store = useTracklist();
        store.insertAfterCurrent(tracks);
      });
    },
    icon: PlayNextIcon,
  };

  const add_to_queue = <Option>{
    label: "context_menus.shared.queue",
    action: () => {
      getArtistTracks(artisthash).then((tracks) => {
        const store = useTracklist();
        store.addTracks(tracks);
      });
    },
    icon: AddToQueueIcon,
  };

  // Action for each playlist option
  const AddToPlaylistAction = (playlist: Playlist) => {
    addArtistToPlaylist(playlist, artisthash);
  };

  const add_to_playlist: Option = {
    label: "context_menus.shared.add_to_playlist",
    children: await getAddToPlaylistOptions(AddToPlaylistAction, {
      artisthash,
    }),
    icon: PlusIcon,
  };

  const save_as_playlist: Option = {
    label: "context_menus.shared.save_as_playlist",
    action: () => {
      const store = modal();
      store.showSaveArtistAsPlaylistModal(artistname, artisthash);
    },
    icon: PlaylistIcon,
  };

  return [
    play_next,
    add_to_queue,
    add_to_playlist,
    save_as_playlist,
    get_find_on_social("artist"),
  ];
};
