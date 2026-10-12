<template>
  <div class="app-layout">
    <pv-toolbar class="bg-primary px-4 shadow-2">
      <template #start>
        <div class="flex align-items-center gap-2">
          <img :src="logoUrl" alt="Logo" width="40" height="40" class="border-round" />
          <span class="font-bold text-xl text-white">{{ $t('GeoMine') }}</span>
        </div>
      </template>

      <template #center>
        <div class="flex gap-3">
          <router-link to="/home" class="p-button p-button-text text-white font-bold">{{ $t('Home') }}</router-link>
          <router-link to="/weather/reports/new" class="p-button p-button-text text-white font-bold">{{ $t('New Telemetry') }}</router-link>
        </div>
      </template>

      <template #end>
        <language-switcher />
      </template>
    </pv-toolbar>


    <div class="main-content p-4">

    </div>

    <footer-content />
  </div>
</template>

<script>
/**
 * @summary Main layout integrating the toolbar, routing views, and language switcher.
 * @author Eduardo Martin Guillen Chavez
 */
import LanguageSwitcher from './language-switcher.vue';
import FooterContent from './footer-content.vue';
export default {
  name: 'layout-component',
  components: {
    LanguageSwitcher,
    FooterContent
  },
  computed: {
    logoUrl() {
      return 'https://img.logo.dev/https://www.geomine.fr.png?size=40&color=white';
    }
  }
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>