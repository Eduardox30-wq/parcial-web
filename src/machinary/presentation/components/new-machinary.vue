<template>
  <pv-card class="shadow-2 border-round-xl p-3">
    <template #title>{{ report.city }}</template>
    <template #subtitle>{{ report.country }} - {{ report.climateZone }}</template>
    <template #content>
      <p><strong>Temperature:</strong> {{ report.temperature }} °C</p>
      <p><strong>Registered At:</strong> {{ report.registeredAt }}</p>
    </template>
    <template #footer>
      <div class="text-sm text-color-secondary">
        <p>Wind Speed: {{ report.windSpeed }} km/h | Humidity: {{ report.relativeHumidity }}%</p>
        <p>Observed At: {{ report.observedAt }}</p>
      </div>
    </template>
  </pv-card>
</template>

<script>
/**
 * @summary Component to display a summary card of a weather report.
 * @author Eduardo Martin Guillen Chavez
 */
export default {
  name: 'machinary-summary',
  props: {
    report: {
      type: Object,
      required: true
    }
  }
};
</script>