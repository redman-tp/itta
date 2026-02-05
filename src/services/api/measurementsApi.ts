import { httpClient } from './httpClient';
import type { MeasurementRecord, MeasurementCodeLookup } from 'src/types/domain';

export const measurementsApi = {
  async fetchMeasurements() {
    // TODO: connect backend
    return httpClient.get<MeasurementRecord[]>('/measurements');
  },
  async updateMeasurements(payload: MeasurementRecord) {
    // TODO: connect backend
    return httpClient.put<MeasurementRecord>(`/measurements/${payload.id}`, payload);
  },
  async lookupMeasurementCode(code: string) {
    // TODO: connect backend
    return httpClient.get<MeasurementCodeLookup>(`/measurements/code/${code}`);
  },
};
