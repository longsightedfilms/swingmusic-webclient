<template>
  <div class="welcome-to-swing">
    <h3 class="t-center">
      {{ $t("modals.welcome.title") }}
      <span class="app-name">Swing Music</span>
    </h3>
    <p>
      {{ $t("modals.welcome.description") }}
    </p>
    <hr />
    <p class="t-center">{{ $t("modals.welcome.cta") }}</p>
    <hr />
    <br />

    <div class="bottom-banner">
      <div class="creator t-center">
        {{ $t("modals.welcome.developer") }}
        <span class="name"
          ><a target="_blank" href="https://github.com/cwilvx"
            >@cwilvx</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.welcome-to-swing {
  p {
    line-height: 1.5rem;
  }

  hr {
    border: none;
    border-bottom: 1px $gray3 solid;
  }

  .app-name {
    font-size: 1.5rem;
    color: $pink;
  }

  .bottom-banner {
    font-size: small;
    margin-top: 1rem;
    opacity: 0.74;

    a {
      color: $pink;
      cursor: pointer !important;
    }
  }
}
</style>
