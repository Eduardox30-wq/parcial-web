import { TelemetryEntity } from '../domain/model/telemetry-readings.entity.js';
/**
 * @summary Main layout integrating the toolbar, routing views, and language switcher.
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
