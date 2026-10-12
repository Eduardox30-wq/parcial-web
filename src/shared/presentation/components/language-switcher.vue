<template>
  <pv-select-button v-model="$i18n.locale" :options="languages" optionLabel="label" optionValue="value" :allowEmpty="false" />
</template>

<script>
/**
 * @summary Language switcher component for toggling between English and Spanish.
 * @author Eduardo Martin Guillen Chavez
 */
export default {
  name: 'language-switcher',
  data() {
    return {
      languages: [
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' }
      ]
    };
  }
};
</script>