import {computed, ref} from "vue";
import { InspectionAssembler } from "../infrastructure/inspection-record.assembler.js";
import {TelemetryAssembler} from "../infrastructure/telemetry-readings.assembler.js";
import {inspectionEntity} from "../domain/model/inspection-records.entity.js";
import {defineStore} from "pinia";
/**
 * @summary This store is responsible for managing the state of the publishing module, including categories and tutorials. It provides methods to fetch, update, add, and delete categories and tutorials, as well as to retrieve specific entities by their IDs. The store also handles errors that may occur during API calls.
 * @author Eduardo Martin Guillen Chavez
 */
//const publishingApi = new PublishingApi();

const MachinaryStore = defineStore('machinaryStore',
    ()=>{
        const categories = ref([]);

        const inspections = ref([]);

        const errors = ref([]);

        const categoriesLoaded = ref(false);
        const inspectionsLoaded = ref(false);

        function fetchCategories(){
            publishingApi.getCategories().then(response => {
                categories.value = TelemetryAssembler.toEntitiesFromResponse(response);
                categoriesLoaded.value = true;
                console.log(categories.value);
                console.log(categoriesLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function fetchInspections(){
            publishingApi.getInspections().then(response => {
                inspections.value = TelemetryAssembler.toEntitiesFromResponse(response);
                inspectionsLoaded.value = true;
                console.log(inspections.value);
                console.log(inspectionsLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            })
        }
        function updateCategory(category){
            MachinaryStore()Api.updateCategory(category).then(response => {
                const updatedCategory = TelemetryAssembler.toEntityFromResource(response.data);
                const index = categories.value.findIndex(c => c.id === updatedCategory.id);
                if (index !== -1) {
                    categories.value[index] = updatedCategory;
                }
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function addCategory(category) {
            publishingApi.createCategory(category).then(response => {
                const newCategory = TelemetryAssembler.toEntityFromResource(response.data);
                categories.value.push(newCategory);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function getCategoryById(id) {
            let idNum = parseInt(id);
            return categories.value.find(category => category.id === idNum);
        }
        function getInspectionById(id) {
            let idNum = parseInt(id);
            return inspections.value.find(inspection => inspection.id === idNum);
        }
        function deleteCategory(category) {
            publishingApi.deleteCategory(category.id).then(response => {
                if (response.status === 200) {
                    categories.value = categories.value.filter(car => cat.id !== category.id);
                }
            }).catch(error => {
                errors.value.push(error);
            });
        }
        return {categories,
            inspections,
            errors,
            categoriesLoaded,
            inspectionsLoaded,
            fetchTelemetryReadings,
            fetchInspections,
            updateTelemetryReading,
            addInspection,
            getTelemetryReadingById,
            getInspectionById,
            deleteCategory
        };
    }
)
export default MachinaryStore;