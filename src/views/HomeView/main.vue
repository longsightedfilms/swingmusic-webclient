<template>
    <div class="homepageview content-page">
        <GenericHeader>
            <template #name>{{ $t("home.title") }}</template>
            <template #description>{{ getGreetings('') }}</template>
        </GenericHeader>
        <!-- v-if="home.recentlyPlayed.length" -->
        <RecentItems
            :title="$t('recent_items.played')"
            :items="home.recentlyPlayed"
            :play-source="playSources.track"
        />
        <!-- v-if="home.recentlyAdded.length" -->
        <RecentItems
            :title="$t('recent_items.added')"
            :items="home.recentlyAdded"
            :play-source="playSources.recentlyAdded"
            :route="'/playlist/recentlyadded'"
        />
        <Browse />
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { playSources } from '@/enums'
import { updateCardWidth } from '@/stores/content-width'
import useHome from '@/stores/home'
import updatePageTitle from '@/utils/updatePageTitle'

import Browse from '@/components/HomeView/Browse.vue'
import RecentItems from '@/components/shared/CardScroller.vue'
import GenericHeader from '@/components/shared/GenericHeader.vue'

const home = useHome()
const { t } = useI18n({ useScope: 'global' })

// const recentlyPlayed = computed(() => {
//     if (!home.recentlyPlayed.length) {
//         return []
//     }
//     return home.recentlyPlayed.fill({
//         type: 'placeholder',
//         with_helptext: true,
//     })
// })

function getGreetings(username: string) {
    const date = new Date()
    const hour = date.getHours()

    if (hour <= 3) {
        return t("home.greetings.night")
    } else if (hour <= 5) {
        return t("home.greetings.early_morning")
    } else if (hour <= 12) {
        return t("home.greetings.morning") + username
    } else if (hour <= 18) {
        return t("home.greetings.afternoon") + username
    } else {
        return t("home.greetings.evening") + username
    }
}

onMounted(async () => {
    updatePageTitle(t("home.title"))
    await home.fetchRecentlyAdded()

    nextTick().then(updateCardWidth)

    await home.fetchRecentlyPlayed()
})

onBeforeRouteLeave(() => home.resetAll())
</script>

<style lang="scss">
.homepageview {
    height: 100%;
    overflow: auto;

    .generichead {
        margin-bottom: 0;
    }
}
</style>
