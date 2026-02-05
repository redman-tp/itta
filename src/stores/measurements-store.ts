import { defineStore } from 'pinia';
import type { MeasurementRecord, MeasurementCodeLookup } from 'src/types/domain';
import { mockMeasurements } from 'src/data/mock-data';
import { measurementsApi } from 'src/services/api/measurementsApi';

interface MeasurementsState {
  measurements: MeasurementRecord[];
  selectedCode: MeasurementCodeLookup | null;
}

export const useMeasurementsStore = defineStore('measurements', {
  state: (): MeasurementsState => ({
    measurements: mockMeasurements,
    selectedCode: null,
  }),
  actions: {
    updateMeasurement(record: MeasurementRecord) {
      const index = this.measurements.findIndex((item) => item.id === record.id);
      if (index >= 0) {
        this.measurements[index] = record;
      } else {
        this.measurements.push(record);
      }
    },
    generateCode() {
      const code = `ITT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      if (this.measurements[0]) {
        this.measurements[0].code = code;
      }
      return code;
    },
    lookupCode(code: string) {
      const found = this.measurements.find((item) => item.code === code);
      this.selectedCode = found
        ? { code, values: found.values, photoUrl: found.photoUrl }
        : null;
    },
    async fetchMeasurements() {
      // TODO: replace mock with backend response
      const response = await measurementsApi.fetchMeasurements();
      this.measurements = response.data;
    },
    async updateMeasurementRemote(record: MeasurementRecord) {
      // TODO: replace mock with backend response
      const response = await measurementsApi.updateMeasurements(record);
      this.updateMeasurement(response.data);
    },
    async lookupCodeRemote(code: string) {
      // TODO: replace mock with backend response
      const response = await measurementsApi.lookupMeasurementCode(code);
      this.selectedCode = response.data;
    },
  },
});
