<template>
  <div class="homebrowse">
    <div class="btitle"><b>{{ $t("home.browse") }}</b></div>
    <div class="browselist">
      <RouterLink
        v-for="i in browselist"
        :key="i.title"
        class="browseitem rounded-sm t-center"
        :to="{ name: i.route, params: i.params }"
        :style="{ width: `${album_card_with - 24}px` }"
      >
        {{ $t(i.title) }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routes } from "@/router";
import { album_card_with } from "@/stores/content-width";

const browselist = [
  {
    title: "shared.folders",
    route: Routes.folder,
    params: {
      path: "$home",
    },
  },
  {
    title: "shared.albums",
    route: Routes.AlbumList,
  },
  {
    title: "shared.artists",
    route: Routes.ArtistList,
  },
  {
    title: "shared.playlists",
    route: Routes.playlists,
  },
  {
    title: "shared.favorites",
    route: Routes.favorites,
  },
  {
    title: "shared.favorite_tracks",
    route: Routes.favoriteTracks,
  },
  {
    title: "shared.favorite_artists",
    route: Routes.favoriteArtists,
  },
];
</script>

<style lang="scss">
.homebrowse {
  padding: 1.5rem 0;
  padding-left: $small;

  .btitle {
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  .browselist {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: $small;
  }

  .browseitem {
    padding: 1.5rem 0;
    background-color: $gray;
    color: $white;
  }

  .browseitem:hover {
    background-color: $gray5;
  }
}
</style>
