/**
 * @summary InspectionRecords services for API CRUD operations.
 * @author Eduardo Martin Guillen Chavez
 */
import http from '/src/shared/infrastructure/services/http-common.js';
import { InspectionAssembler } from '/inspection-record.assembler.js';

export class InspectionRecordService {
    async getAll() {
        const response = await http.get('/inspection-records');
        return response.data.map(resource => InspectionAssembler.toEntityFromResource(resource));
    }
}