import { useI18n } from "vue-i18n";
import useModal from "@/stores/modal";
import useAlbum from "@/stores/pages/album";
import useTracklist from "@/stores/queue/tracklist";

import { Option, Playlist } from "@/interfaces";
import { addAlbumToPlaylist } from "@/requests/playlists";
import { getAddToPlaylistOptions, get_find_on_social } from "./utils";
import { AddToQueueIcon, PlayNextIcon, PlaylistIcon, PlusIcon } from "@/icons";

export default async () => {
  const play_next = <Option>{
    label: "context_menus.shared.play_next",
    action: () => {
      const tracks = useAlbum().tracks.filter(
        (track) => !track.is_album_disc_number
      );
      useTracklist().insertAfterCurrent(tracks);
    },
    icon: PlayNextIcon,
  };

  const add_to_queue = <Option>{
    label: "context_menus.shared.queue",
    action: () => {
      const tracks = useAlbum().tracks.filter(
        (track) => !track.is_album_disc_number
      );
      useTracklist().addTracks(tracks);
    },
    icon: AddToQueueIcon,
  };

  // Action for each playlist option
  const AddToPlaylistAction = (playlist: Playlist) => {
    const store = useAlbum();
    addAlbumToPlaylist(playlist, store.info.albumhash);
  };

  const add_to_playlist: Option = {
    label: "context_menus.shared.add_to_playlist",
    children: await getAddToPlaylistOptions(AddToPlaylistAction, {
      albumhash: useAlbum().info.albumhash,
    }),
    icon: PlusIcon,
  };

  const save_as_playlist: Option = {
    label: "context_menus.shared.save_as_playlist",
    action: () => {
      const modal = useModal();
      const album = useAlbum();

      modal.showSaveAlbumAsPlaylistModal(
        album.info.title,
        album.info.albumhash
      );
    },
    icon: PlaylistIcon,
  };

  return [
    play_next,
    add_to_queue,
    add_to_playlist,
    save_as_playlist,
    get_find_on_social(),
  ];
};
