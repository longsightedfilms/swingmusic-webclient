import { Routes } from "@/router";
import useSearchStore from "@/stores/search";

import FolderSvg from "@/assets/icons/folder-1.svg";
import HeartSvg from "@/assets/icons/heart.svg";
import PlaylistSvg from "@/assets/icons/playlist-1.svg";
import SearchSvg from "@/assets/icons/search.svg";
import SettingsSvg from "@/assets/icons/settings.svg";
import HomeSvg from "@/assets/icons/home.svg";


const folder = {
  name: "shared.folders",
  route_name: Routes.folder,
  params: { path: "$home" },
  icon: FolderSvg,
};

const favorites = {
  name: "shared.favorites",
  route_name: Routes.favorites,
  icon: HeartSvg,
};

const playlists = {
  name: "shared.playlists",
  route_name: Routes.playlists,
  icon: PlaylistSvg,
};

const home = {
  name: "home.title",
  route_name: Routes.Home,
  icon: HomeSvg,
};

export const menus = [
  home,
  folder,
  {
    name: "shared.search",
    route_name: Routes.search,
    params: { page: "top" },
    query: () => ({ q: useSearchStore().query }),
    icon: SearchSvg,
  },
  {
    separator: true,
  },
  favorites,
  playlists,
  {
    separator: true,
  },
  {
    name: "shared.settings",
    route_name: Routes.settings,
    params: { tab: "general" },
    icon: SettingsSvg,
  },
];

export const topnavitems = [home, folder, favorites, playlists];
