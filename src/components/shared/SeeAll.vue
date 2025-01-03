<template>
  <span class="see-all">
    <RouterLink :to="route"> <b>{{ $t("shared.see_all") }}</b> </RouterLink>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  route: string;
}>();
</script>

<style lang="scss">
.see-all {
  font-size: $medium;
  opacity: 0.75;
  text-transform: uppercase;

  a:hover {
    text-decoration: underline;
  }
}
</style>
