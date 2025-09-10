<template>
  <div class="">
   <div class="lg:flex justify-between items-center mb-4">
		<h1 class="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 lg:mb-0 text-center lg:text-start">Listes des Opérateurs</h1>
    <div class="flex align-center justify-end">
      <button
        type="button"
        @click="openNewItemDialog"
        class="text-white hover:bg-green-600 bg-green-600 focus:outline-none rounded-full focus:ring-4 font-medium text-base px-5 py-2.5 text-center me-2 mb-2"
      >
        Ajouter un opérateur
      </button>
    </div>
	 </div> 

    <!-- Tableau -->
    <div class="shadow-md rounded-2xl">
      <div class="relative overflow-x-auto md:overflow-hidden shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-base bg-green-600 text-white uppercase">
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                scope="col"
                class="px-6 py-3"
              >
                {{ header.title }}
              </th>
              <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in operators"
              :key="item.id"
              class="bg-white border-b border-gray-200 hover:bg-gray-50 text-base font-semibold"
            >
              <td
                v-for="header in headers"
                :key="header.key"
                class="px-6 py-4"
              >
                {{ getOperatorValue(item, header.key) }}
              </td>

              <td class="px-6 py-4 flex space-x-2">
                <!-- Détails -->

							<button data-tooltip-target="tooltip-default" type="button" @click="viewItemDetails(item)" class="w-5 h-5 text-white font-medium rounded-lg text-sm text-center">
								<img src="/icons/eye.svg" alt="">
							</button>

							<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
									Details & Historique
									<div class="tooltip-arrow" data-popper-arrow></div>
							</div>

                <!-- Salaire -->
							<button data-tooltip-target="tooltip-default" type="button" @click="openSalaryForm(item)" class="w-5 h-5 text-white font-medium rounded-lg text-sm text-center">
								<img src="/icons/wallet.svg" alt="">
							</button>

							<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
									Calculer Salaire
									<div class="tooltip-arrow" data-popper-arrow></div>
							</div>

                <!-- Modifier -->
				 			 <button data-tooltip-target="tooltip-default" type="button" @click="editItem(item)" class="w-5 h-5 text-white font-medium rounded-lg text-sm text-center">
									<img src="/icons/edit.svg" alt="">
								</button>

								<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
										Modifier
										<div class="tooltip-arrow" data-popper-arrow></div>
								</div>

                <!-- Supprimer -->
				 			 <button data-tooltip-target="tooltip-default" type="button" @click="deleteItem(item)" class="w-5 h-5 text-white font-medium rounded-lg text-sm text-center">
									<img src="/icons/delete.svg" alt="">
								</button>

								<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
										Supprimer
										<div class="tooltip-arrow" data-popper-arrow></div>
								</div>
															
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

   <!-- Add/Edit Dialog -->
  <BaseModal v-model="editDialog" :title="formTitle" @confirm="saveItem">
    <div class="space-y-2">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900  text-justify">Prénom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
					" v-model="editedItem.first_name" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900  text-justify">Nom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
					" v-model="editedItem.last_name" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900  text-justify">Téléphone</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
					" v-model="editedItem.tel" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900  text-justify">N° Machine</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
					" v-model="editedItem.machineId" type="text" required />
        </div>
      </div>
    </div>
  </BaseModal>

    <!-- Delete Confirmation -->
    <BaseModal v-model="deleteDialog" title="Confirmation de suppression" @confirm="deleteItemConfirm" >
			 <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					Êtes-vous sûr de vouloir supprimer cet opérateur ?
                </p>
            </div>
		</BaseModal>

    <!-- Salary Form -->
    <BaseModal v-model="salaryFormDialog" :title="`Calculer le salaire pour ${currentOperator?.first_name} ${currentOperator?.last_name}`" @confirm="confirmAndCalculate">
    <!-- CA TTC -->
   <div>
	<div class="grid gap-6 mb-6 md:grid-cols-2 text-justify">
		 <div class="col-span-2">
      <label class="block mb-1 text-sm font-medium">Date de calcul du salaire</label>
			<input
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              "
			 type="date" v-model="selectedDate" @change="handleDateChange" />
      <!-- <input
        v-model.number="salaryInput.date"
        type="date"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              "
      /> -->
    </div>
    <div>
      <label class="block mb-1 text-sm font-medium">CA TTC</label>
      <input
        v-model.number="salaryInput.chiffreAffaireMensuelttc"
        type="number"
        placeholder="CA TTC"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              "
      />
    </div>

    <!-- CA HT -->
    <div>
      <label class="block mb-1 text-sm font-medium">CA Hors Taxe</label>
      <input
        :value="chiffreAffaireHorsTaxe.toFixed(2)"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               "
      />
    </div>

    <!-- Commission -->
    <div>
      <label class="block mb-1 text-sm font-medium">Commission %</label>
      <input
        v-model.number="salaryInput.percentCommissionBrute"
        type="number"
        placeholder="% Commission"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               "
      />
    </div>

    <!-- Commission brute -->
    <div>
      <label class="block mb-1 text-sm font-medium">Commission brute</label>
      <input
        :value="commissionBrute.toFixed(2)"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               "
      />
    </div>

		     <!-- Commission -->
    <div>
      <label class="block mb-1 text-sm font-medium">Nette à verser</label>
      <input
        v-model.number="salaryInput.payement"
        type="number"
        placeholder="% Commission"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               "
      />
    </div>

    <!-- Commission brute -->
    <div>
      <label class="block mb-1 text-sm font-medium">Pourcentage Frais MOMO</label>
      <input
        v-model.number="salaryInput.percentFraisMomo"
				 type="number"
        placeholder="% frais momo"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               "
      />
    </div>
   </div>

    <!-- Autres prélèvements -->

		<p class="font-medium mt-4 text-justify">Autres Prélèvements</p>
		<div class="grid gap-6 mb-6 md:grid-cols-2 text-justify">
	   <div>
      <label class="block mb-1 text-sm font-medium">FEL</label>
      <input
        :value="2500"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">AIB</label>
      <input
        :value="calculatedAIB.toFixed(2)"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">Écart</label>
      <input
        v-model.number="salaryInput.ecart"
        type="number"
        placeholder="Écart"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div>
    <div>
      <label class="block mb-1 text-sm font-medium">Remboursement</label>
      <input
        v-model.number="salaryInput.remboursement"
        type="number"
        placeholder="Remboursement"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div>


    <div>
      <label class="block mb-1 text-sm font-medium">Pénalité</label>
      <input
        :value="calculatedPenalite"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div>

		  <div>
      <label class="block mb-1 text-sm font-medium">Frais MOMO</label>
      <input
        :value="calculatedFraisMomo.toFixed(2)"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div>

    <!-- <div>
      <label class="block mb-1 text-sm font-medium">Débours</label>
      <input
        :value="calculatedDebours"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 "
      />
    </div> -->
 </div>
   </div>
    </BaseModal>

    <!-- Salary Confirmation -->
    <BaseModal v-model="salaryConfirmDialog" :title="`Calculer le salaire pour ${currentOperator?.first_name} ${currentOperator?.last_name}`" @confirm="executeCalculation" >
			<div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					Êtes-vous sûr de vouloir valider ces informations ?
                </p>
            </div>
		</BaseModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useOperatorsStore, type Operator, type SalaryCalculation } from '../stores/operators'
import { useSalaryCalculator, type SalaryInput } from '../composables/useSalaryCalculator'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BaseModal from '../components/BaseModal.vue'
import { extractMonthAndYear } from '../utils/formatDate'

const router = useRouter()
const operatorsStore = useOperatorsStore()
const { operators } = storeToRefs(operatorsStore)
const { calculate } = useSalaryCalculator()

function getOperatorValue(item: Operator, key: string) {
  if (key === 'id' || key === 'nom' || key === 'prenom' || key === 'tel' || key === 'machineId') {
    return item[key as keyof Operator]
  }
  return ''
}

// TABLE
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Prénom', key: 'prenom' },
  { title: 'Nom', key: 'nom' },
  { title: 'Téléphone', key: 'tel' },
  { title: 'N° Machine', key: 'machineId' },
])

// ADD/EDIT
const editDialog = ref(false)
const editedIndex = ref(-1)
const editedItem = ref<Partial<Operator>>({})
const selectedDate = ref(""); // lié au champ input type="date"
const monthYear = ref<{ month: string; year: string } | null>(null);
const defaultItem: Partial<Operator> = { last_name: '', first_name: '', tel: '', machineId: '' }
const formTitle = computed(() => (editedIndex.value === -1 ? 'Nouvel opérateur' : 'Modifier opérateur'))

function openNewItemDialog() {
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
  editDialog.value = true
}
function editItem(item: Operator) {
  editedIndex.value = operators.value.findIndex((o) => o.id === item.id)
  editedItem.value = { ...item }
  editDialog.value = true
}
function saveItem() {
  if (editedIndex.value > -1) {
    operatorsStore.updateOperator(editedItem.value as Operator)
  } else {
    operatorsStore.addOperator(editedItem.value as Omit<Operator, 'id' | 'salaryHistory'>)
  }
  editDialog.value = false
}

// DELETE
const deleteDialog = ref(false)
const itemToDelete = ref<Operator | null>(null)
function deleteItem(item: Operator) {
  itemToDelete.value = item
  deleteDialog.value = true
}
function deleteItemConfirm() {
  if (itemToDelete.value) operatorsStore.deleteOperator(itemToDelete.value.id)
  deleteDialog.value = false
  itemToDelete.value = null
}

// SALARY
const salaryFormDialog = ref(false)
const salaryConfirmDialog = ref(false)
const currentOperator = ref<Operator | null>(null)
const defaultSalaryInput: SalaryInput = {
	chiffreAffaireMensuelttc: 0, percentCommissionBrute: 0,
	percentFraisMomo: 0,
	payement: 0,
	date: ''
}
const salaryInput = ref<SalaryInput>({ ...defaultSalaryInput })

const chiffreAffaireHorsTaxe = computed(() => salaryInput.value.chiffreAffaireMensuelttc / 1.1)
const commissionBrute = computed(() => chiffreAffaireHorsTaxe.value * (salaryInput.value.percentCommissionBrute || 0) / 100)
const calculatedAIB = computed(() => commissionBrute.value * 0.05)
const calculatedFraisMomo = computed(() => salaryInput.value.payement * salaryInput.value.percentFraisMomo / 100)

// const calculatedDebours = computed(() => salaryInput.value.chiffreAffaireMensuelttc * 0.1)
const calculatedPenalite = computed(() => (salaryInput.value.ecart && salaryInput.value.ecart > 0 ? salaryInput.value.ecart * 0.15 : 0))

function openSalaryForm(item: Operator) {
  currentOperator.value = item
  salaryInput.value = { ...defaultSalaryInput }
  salaryFormDialog.value = true
}
function viewItemDetails(item: Operator) {
  router.push({ name: 'operateur-details', params: { id: item.id } })
}
function confirmAndCalculate() {
  if ((salaryInput.value.chiffreAffaireMensuelttc || 0) <= 0) {
    alert('Le Chiffre d’Affaire doit être > 0')
    return
  }
  salaryConfirmDialog.value = true
}

function handleDateChange() {
  if (selectedDate.value) {
    monthYear.value = extractMonthAndYear(selectedDate.value);
  }
}

function executeCalculation() {
  if (!currentOperator.value) return
  const calculationResult = calculate(salaryInput.value)
	
const finalRecord: SalaryCalculation = {
  ...calculationResult, // garde tous les bons calculs
  operatorName: `${currentOperator.value.first_name} ${currentOperator.value.last_name}`,
   date: selectedDate.value, // 🟢 On prend la date choisie dans l'input
  }

  console.log('Record enregistré :', finalRecord)

  operatorsStore.addSalaryRecord(currentOperator.value.id, finalRecord)
  salaryConfirmDialog.value = false
  salaryFormDialog.value = false
  const operatorId = currentOperator.value?.id
  currentOperator.value = null
  if (operatorId !== undefined) {
    router.push({ name: 'operateur-details', params: { id: operatorId } })
  }
}
</script>


<style scoped>

</style>