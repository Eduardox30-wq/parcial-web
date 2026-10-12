import {computed, ref} from "vue";
//import {PublishingApi} from "../infrastructure/publishing-api.js";
import { InspectionAssembler } from "../infrastructure/inspection-record.assembler.js";
import {TelemetryAssembler} from "../infrastructure/telemetry-readings.assembler.js";
import {TelemetryEntity} from "../domain/model/telemetry-readings.entity.js";
import {inspectionEntity} from "../domain/model/inspection-records.entity.js";
import {defineStore} from "pinia";
/**
 * @summary Main layout integrating the toolbar, routing views, and language switcher.
 * @author Eduardo Martin Guillen Chavez
 */
//const publishingApi = new PublishingApi();

const usePublishingStore = defineStore('publishing',
    ()=>{
        const categories = ref([]);

        const tutorials = ref([]);

        const errors = ref([]);

        const categoriesLoaded = ref(false);
        const tutorialsLoaded = ref(false);

        function fetchCategories(){
            publishingApi.getCategories().then(response => {
                categories.value = CategoryAssembler.toEntitiesFromResponse(response);
                categoriesLoaded.value = true;
                console.log(categories.value);
                console.log(categoriesLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function fetchTutorials(){
            publishingApi.getTutorials().then(response => {
                tutorials.value = TutorialAssembler.toEntitiesFromResponse(response);
                tutorialsLoaded.value = true;
                console.log(tutorials.value);
                console.log(tutorialsLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            })
        }
        function updateCategory(category){
            publishingApi.updateCategory(category).then(response => {
                const updatedCategory = CategoryAssembler.toEntityFromResource(response.data);
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
                const newCategory = CategoryAssembler.toEntityFromResource(response.data);
                categories.value.push(newCategory);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function getCategoryById(id) {
            let idNum = parseInt(id);
            return categories.value.find(category => category.id === idNum);
        }
        function getTutorialById(id) {
            let idNum = parseInt(id);
            return tutorials.value.find(tutorial => tutorial.id === idNum);
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
            tutorials,
            errors,
            categoriesLoaded,
            tutorialsLoaded,
            fetchCategories,
            fetchTutorials,
            updateCategory,
            addCategory,
            getCategoryById,
            getTutorialById,
            deleteCategory
        };
    }
)
export default usePublishingStore;