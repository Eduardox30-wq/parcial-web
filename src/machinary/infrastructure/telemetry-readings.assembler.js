import { TelemetryEntity } from '../domain/model/telemetry-readings.entity.js';
/**
 * @summary TelemetryAssembler is a class that provides methods to convert telemetry resources to telemetry entities.
 * @author Eduardo Martin Guillen Chavez
 */
export class TelemetryAssembler{

    static toEntityFromResource(resource){
        return new TelemetryEntity({...resource});
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200)
        {
            console.log('Error en TelemetryAssembler');
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['telemetry-readings'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

}
