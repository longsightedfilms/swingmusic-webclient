<template>
  <div class="album-stats ellip2">
    <div class="ellip">
      <ArtistName
        :artists="album.albumartists"
        :albumartists="''"
        :small="true"
        :append="!isSmallPhone ? statsText : ''"
      />
    </div>
    <div v-if="isSmallPhone" class="stats2">
      {{ album.date }} {{ !album.is_single ? `• ${$t("artist.tracks_count", album.count)}` : "" }} •
      {{ formatSeconds(album.duration, true, $t) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { Album } from "@/interfaces";
import { formatSeconds } from "@/utils";
import { isSmallPhone } from "@/stores/content-width";

import ArtistName from "@/components/shared/ArtistName.vue";

const props = defineProps<{
  album: Album;
}>();

const { t } = useI18n({ useScope: "global" });

const statsText = computed(() => {
  const is_single = props.album.is_single;

  // hide track count if it's a single, also add an s to track if it's plural
  return `• ${props.album.date} ${
    !is_single
      ? `• ${t("artist.tracks_count", props.album.count)}`
      : ""
  } • ${formatSeconds(props.album.duration, true, t)}`;
});
</script>

<style lang="scss">
.album-stats {
  font-weight: bold;
  margin-bottom: 0.75rem;
  font-size: 14px;
  padding-left: $smaller;

  .artistname {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    font-size: 0.8rem;
    word-break: normal;
  }
}
</style>
