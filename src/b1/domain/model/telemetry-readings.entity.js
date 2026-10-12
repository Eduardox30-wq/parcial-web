export class TelemetryEntity {
    constructor(id, machineryCode, modelId, pitSectionId, operatingHours,
                engineTemperatureC, oilPressurePsi, alertTriggered, registeredAt){
        this.id = id;
        this.machineryCode = machineryCode;
        this.modelId = modelId;
        this.pitSectionId = pitSectionId;
        this.operatingHours = operatingHours;
        this.engineTemperatureC = engineTemperatureC;
        this.oilPressurePsi = oilPressurePsi;
        this.alertTriggered = alertTriggered;
        this.registeredAt = registeredAt;
    }
}