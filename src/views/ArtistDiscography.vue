<template>
  <div class="content-page artistdiscogview">
    <GenericHeader>
      <template #name>{{ getTypeName(route.params.type) }}</template>
      <template #description>
        <RouterLink
          :to="{
            name: Routes.artist,
            params: {
              hash: route.params.hash,
            },
          }"
          >{{ route.query.artist }}</RouterLink
        >
        • {{ $t(`artist.${route.params.type}_count`, artist.toShow.length) }}
      </template>
    </GenericHeader>
    <GenericTabs
      :items="
        Object.values(discographyAlbumTypes).map((type) => ({
          title: $t(`shared.${type}`),
          type,
          params: {
            hash: route.params.hash,
            type: type,
          },
          query: { artist: route.query.artist },
        }))
      "
      :active="
        (item) => {
          return item.type == route.params.type;
        }
      "
      :route="Routes.artistDiscography"
    /><br />
    <div v-if="artist.toShow.length" class="cards">
      <AlbumCard
        v-for="album in artist.toShow.sort(
          (a, b) => parseInt(b.date) - parseInt(a.date)
        )"
        :key="album.albumhash"
        :album="album"
        :artist_page="true"
        :show_date="true"
      />
    </div>
    <NoItems
      v-else
      :title="'No contributions'"
      :flag="!artist.toShow.length"
      :icon="AlbumSvg"
      :description="`No ${getTypeName($route.params.type)} found for ${
        route.query.artist
      }`"
    />
  </div>
</template>

<script setup lang="ts">
import { Routes } from "@/router";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";

import { discographyAlbumTypes } from "@/enums";
import useArtistDiscography from "@/stores/pages/artistDiscog";
import updatePageTitle from "@/utils/updatePageTitle";

import AlbumSvg from "@/assets/icons/album.svg";
import AlbumCard from "@/components/shared/AlbumCard.vue";
import GenericHeader from "@/components/shared/GenericHeader.vue";
import GenericTabs from "@/components/shared/GenericTabs.vue";
import NoItems from "@/components/shared/NoItems.vue";

const route = useRoute();
const artist = useArtistDiscography();
const { t } = useI18n({ useScope: "global" });

function getTypeName(type: string | string[]) {
  return t(`shared.${type == 'all' ? 'all_albums' : type}`);
}

onMounted(() => {
  updatePageTitle(t("artist.discography", String(route.params.artist) || ""));
  artist.fetchAlbums(route.params.hash as string);
});

onBeforeRouteUpdate((to, from, next) => {
  artist.setAlbums(to.params.type as string);
  next();
});

onBeforeRouteLeave(() => artist.resetStore());
</script>

<style lang="scss">
.artistdiscogview {
  height: 100%;
  overflow: auto;

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($cardwidth, 1fr));
    gap: 2rem 0;
  }

  .generichead {
    h1,
    .caps {
      text-transform: capitalize;
    }
  }

  .generictabs {
    padding: 0 1rem;
    text-transform: capitalize;
  }

  .nothing {
    height: max-content;
    padding-top: 5rem;
  }
}
</style>
