/**
 * @summary TelemetryReadingService is a class that provides methods to interact with the telemetry readings API.
 * @author Eduardo Martin Guillen Chavez
 */
import http from '/src/shared/infrastructure/services/http-common.js';
import { TelemetryAssembler } from '/telemetry-readings.assembler.js';

export class TelemetryReadingService {
    async getAll() {
        const response = await http.get('/telemetry-readings');
        return response.data.map(resource => TelemetryAssembler.toEntityFromResource(resource));
    }

    async create(report) {
        const resource = TelemetryAssembler.toResource(report);
        const response = await http.post('/telemetry-readings', resource);
        return TelemetryAssembler.toEntityFromResource(response.data);
    }
}