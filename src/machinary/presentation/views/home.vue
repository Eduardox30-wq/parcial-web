<template>
  <div class="p-4">
    <h2>{{ $t('home.title') }}</h2>
    <p>{{ $t('home.content') }}</p>

    <h3 class="mt-4">{{ $t('home.InspectionTitle') }}</h3>

    <div v-if="reports.length === 0" class="text-xl font-bold text-gray-500">
      {{ $t('home.empty') }}
    </div>

    <div class="grid">
      <div v-for="report in reports" :key="report.id" class="col-12 md:col-6 lg:col-4 p-2">
        <weather-report-summary :report="report" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @summary Home View displaying weather station monitoring reports grid.
 * @author Eduardo Martin Guillen Chavez
 */
import { InspectionService } from '/src/stations/infrastructure/services/inspection.service.js';

export default {
  name: 'home-view',
  components: { InspectionService  },
  data() {
    return {
      reports: [],
      reportService: new InspectionService()
    };
  },
  async created() {
    try {
      this.reports = await this.reportService.getAll();
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }
};
</script>