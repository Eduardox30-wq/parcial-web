/**
 * @summary Inspection entity class representing an inspection record for machinery.
 * @author Eduardo Martin Guillen Chavez
 */
export class inspectionEntity {
    constructor(Id, machineryCode, pitSectionId, inspectorName, status,
                notes, inspectedAt, maxOperatingHours) {
        this.id = Id;
        this.machineryCode = machineryCode;
        this.pitSectionId = pitSectionId;
        this.inspectorName = inspectorName;
        this.status = status;
        this.notes = notes;
        this.inspectedAt = inspectedAt;
        this.maxOperatingHours = maxOperatingHours;
    }
}