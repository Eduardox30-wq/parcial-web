import { inspectionEntity } from '../domain/model/inspection-records.entity.js';
/**
 * @summary Main layout integrating the toolbar, routing views, and language switcher.
 * @author Eduardo Martin Guillen Chavez
 */
export class InspectionAssembler{

    static toEntityFromResource(resource){
        return new inspectionEntity({...resource});
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200)
        {
            console.log('Error en InspectionAssembler');
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['inspection-records'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

}