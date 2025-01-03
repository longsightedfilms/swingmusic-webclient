<template>
  <div class="info">
    <SettingsTitle v-if="$route.name == Routes.settings" :text="$t('shared.settings')" />
    <SearchTitle v-if="$route.name == Routes.search" />
    <PlaylistsTitle v-if="$route.name == Routes.playlists" />
    <SimpleNav
      v-if="$route.name == Routes.artistTracks"
      :text="$route.query.artist as string || $t('artist.tracks')"
    />
    <SimpleNav
      v-if="$route.name === Routes.favoriteAlbums"
      :text="$t('shared.favorite_albums')"
    />
    <SimpleNav
      v-if="$route.name === Routes.favoriteArtists"
      :text="$t('shared.favorite_artists')"
    />
    <SimpleNav
      v-if="$route.name === Routes.favoriteTracks"
      :text="$t('shared.favorite_tracks')"
    />
    <SimpleNav v-if="$route.name === Routes.nowPlaying" :text="$t('shared.now_playing')" />
  </div>
</template>

<script setup lang="ts">
import { Routes } from "@/router";

import SimpleNav from "./Titles/SimpleNav.vue";
import SearchTitle from "./Titles/SearchTitle.vue";
import SettingsTitle from "./Titles/SettingsTitle.vue";
import PlaylistsTitle from "./Titles/PlaylistsTitle.vue";
</script>
