<template>
  <div class="root-dirs-prompt">
    <h3 class="t-center">{{ $t("modals.root_dirs_prompt.title") }}</h3>
    <div class="options-group">
      <div
        v-for="option in options"
        :key="option.id"
        v-motion-slide-bottom
        class="option"
        @click="option.action()"
      >
        <b>{{ option.title }}</b>
        <div class="info">{{ option.info }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import useModalStore from "@/stores/modal";
import useSettingsStore from "@/stores/settings";
import { addRootDirs, getRootDirs } from "@/requests/settings/rootdirs";

const settings = useSettingsStore();
const { t } = useI18n({ useScope: 'global' })

const modal = useModalStore();
const emit = defineEmits<{
  (e: "hideModal"): void;
}>();

const root_dirs: string[] = [];
const options = ref<any[]>([]);

onMounted(() => {
  getRootDirs()
    .then((res) => root_dirs.push(...res))
    .then(() => {
      settings.setRootDirs(root_dirs);

      options.value = [
        {
          id: "$home",
          title: t("modals.root_dirs_prompt.home.title"),
          info: t("modals.root_dirs_prompt.home.description"),
          delay: 0,
          action: () =>
            addRootDirs(["$home"], [])
              .then(() => settings.setRootDirs(["$home"]))
              .then(() => emit("hideModal")),
        },
        {
          id: "wtf",
          title: t("modals.root_dirs_prompt.custom.title"),
          info: t("modals.root_dirs_prompt.custom.description"),
          delay: 0.1,
          action: () => modal.showSetRootDirsModal(),
        },
      ];
    });
});
</script>

<style lang="scss">
.root-dirs-prompt {
  height: 14rem;

  .option {
    padding: 1.25rem;
    border-radius: $small;
    position: relative;
    background-color: #4e4b4b3f;
    margin-top: 1.25rem;
    cursor: pointer;

    &:hover {
      background-color: $darkblue;
    }

    .info {
      margin-top: $smaller;
      font-size: small;
    }
  }
}
</style>
