<template>
  <div v-if="!isSmallPhone" v-auto-animate class="albumtype">
    <span v-if="album.is_soundtrack">{{ $t("album_types.soundtrack") }}</span>
    <span v-else-if="album.is_live">{{ $t("album_types.concert") }}</span>
    <span v-else-if="album.is_compilation">{{ $t("album_types.compilation") }}</span>
    <span v-else-if="album.is_EP">{{ $t("album_types.ep") }}</span>
    <span v-else-if="album.is_single">{{ $t("album_types.single") }}</span>
    <span v-else>{{ $t("tracklist_types.album") }}</span>
  </div>
</template>

<script setup lang="ts">
import { Album } from "@/interfaces";
import { isSmallPhone } from "@/stores/content-width";

defineProps<{
  album: Album;
}>();
</script>

<style lang="scss"></style>
