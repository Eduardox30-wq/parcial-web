<template>
  <div class="p-4 max-w-lg mx-auto">
    <h2>{{ $t('newReport.title') }}</h2>
    <p class="text-subtitle">{{ $t('newReport.subtitle') }}</p>

    <div class="field mt-3">
      <label>{{ $t('newReport.climateZone') }}</label>
      <pv-select v-model="selectedClimateZone" :options="climateZones" placeholder="Select Climate Zone" class="w-full" />
    </div>

    <div class="field mt-3" v-if="selectedClimateZone">
      <label>{{ $t('newReport.station') }}</label>
      <pv-select v-model="selectedStation" :options="filteredStations" optionLabel="name" placeholder="Select Weather Station" class="w-full" @change="onStationSelect" />
    </div>

    <div v-if="errorMessage" class="p-error mt-3 font-bold text-red-500">
      {{ errorMessage }}
    </div>

    <div class="flex gap-2 mt-4" v-if="selectedStation">
      <pv-button label="Create" icon="pi pi-check" @click="saveReport" :disabled="!!errorMessage" />
      <pv-button label="Cancel" icon="pi pi-times" severity="secondary" @click="cancel" />
    </div>
  </div>
</template>

<script>
/**
 * @summary New Weather Report View with Open-Meteo integration and validations.
 * @author Eduardo Martin Guillen Chavez
 */
import { InspectionService } from '/src/stations/infrastructure/services/inspection.service.js';
import { telemetry } from '/src/stations/infrastructure/services/weather-report.service';

import NewMachinary from "../components/new-machinary.vue";
import {TelemetryAssembler} from "../../infrastructure/telemetry-readings.assembler.js";

export default {
  name: 'new-telemetry-report-view',
  data() {
    return {
      stations: [],
      selectedClimateZone: null,
      selectedStation: null,
      climateZones: ['coastal', 'highland', 'tropical', 'desert', 'temperate', 'urban'],
      stationService: new InspectionService(),
      reportService: new InspectionService(),
      NewMachinary: new TelemetryAssembler(),
      currentWeather: null,
      errorMessage: ''
    };
  },
  computed: {
    filteredStations() {
      if (!this.selectedClimateZone) return [];
      return this.stations.filter(s => s.climateZone === this.selectedClimateZone);
    }
  },
  async created() {
    try {
      this.stations = await this.stationService.getAll();
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  },
  methods: {
    async onStationSelect() {
      this.errorMessage = '';
      if (!this.selectedStation) return;
      try {
        const weather = await this.openMeteoService.getCurrentWeather(this.selectedStation.latitude, this.selectedStation.longitude);
        this.currentWeather = {
          temperature: weather.temperature_2m,
          windSpeed: weather.wind_speed_10m,
          relativeHumidity: weather.relative_humidity_2m,
          observedAt: weather.time
        };

        const tempDiff = Math.abs(this.currentWeather.temperature - this.selectedStation.lastTemperature);
        if (tempDiff < 2) {
          this.errorMessage = `Validation failed: Temperature difference (${tempDiff.toFixed(1)}°C) must be >= 2°C compared to last temperature (${this.selectedStation.lastTemperature}°C).`;
        }

        if (this.currentWeather.windSpeed > 60) {
          this.errorMessage += ` Wind speed (${this.currentWeather.windSpeed} km/h) exceeds maximum limit of 60 km/h.`;
        }
      } catch (error) {
        console.error('Error fetching Open-Meteo data:', error);
      }
    },
    async saveReport() {
      if (this.errorMessage) return;

      const newReport = new NewMachinary(
          null,
          this.selectedStation.id,
          this.selectedStation.city,
          this.selectedStation.country,
          this.selectedStation.latitude,
          this.selectedStation.longitude,
          this.currentWeather.temperature,
          this.currentWeather.windSpeed,
          this.currentWeather.relativeHumidity,
          this.currentWeather.observedAt,
          new Date().toISOString()
      );

      await this.reportService.create(newReport);
      this.$router.push('/home');
    },
    cancel() {
      this.$router.push('/home');
    }
  }
};
</script>