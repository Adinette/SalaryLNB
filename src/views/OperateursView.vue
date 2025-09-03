<template>
  <div>
    <h1 class="mb-6 font-extrabold">Listes des Opérateurs</h1>
    <div class="flex align-center justify-end mb-3">
      <button
        type="button"
        @click="openNewItemDialog"
        class="text-white btn hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Ajouter un opérateur
      </button>
    </div>

    <!-- Tableau -->
    <div class="p-6 w-full shadow-md !rounded-2xl">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs bg-blue-600 text-white uppercase dark:bg-gray-700 dark:text-gray-400">
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
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
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
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Prénom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="editedItem.prenom" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Nom</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="editedItem.nom" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Téléphone</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="editedItem.tel" type="text" required />
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">N° Machine</label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="editedItem.machineId" type="text" required />
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
    <BaseModal v-model="salaryFormDialog" :title="`Calculer le salaire pour ${currentOperator?.prenom} ${currentOperator?.nom}`" @confirm="confirmAndCalculate">
    <!-- CA TTC -->
   <div>
	<div class="grid gap-6 mb-6 md:grid-cols-2 text-justify">
	 <div>
      <label class="block mb-1 text-sm font-medium">CA TTC</label>
      <input
        v-model.number="salaryInput.chiffreAffaireMensuelttc"
        type="number"
        placeholder="CA TTC"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <!-- Commission -->
    <div>
      <label class="block mb-1 text-sm font-medium">% Commission</label>
      <input
        v-model.number="salaryInput.percentCommissionBrute"
        type="number"
        placeholder="% Commission"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">AIB</label>
      <input
        :value="calculatedAIB.toFixed(2)"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">Remboursement</label>
      <input
        v-model.number="salaryInput.remboursement"
        type="number"
        placeholder="Remboursement"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">Écart</label>
      <input
        v-model.number="salaryInput.ecart"
        type="number"
        placeholder="Écart"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">Pénalité</label>
      <input
        :value="calculatedPenalite"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium">Débours</label>
      <input
        :value="calculatedDebours"
        readonly
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
               dark:placeholder-gray-400 dark:text-white"
      />
    </div>
 </div>
   </div>
    </BaseModal>

    <!-- Salary Confirmation -->
    <BaseModal v-model="salaryConfirmDialog" :title="`Calculer le salaire pour ${currentOperator?.prenom} ${currentOperator?.nom}`" @confirm="executeCalculation" >
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
const defaultItem: Partial<Operator> = { nom: '', prenom: '', tel: '', machineId: '' }
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
const defaultSalaryInput: SalaryInput = { chiffreAffaireMensuelttc: 0, percentCommissionBrute: 0 }
const salaryInput = ref<SalaryInput>({ ...defaultSalaryInput })

const chiffreAffaireHorsTaxe = computed(() => salaryInput.value.chiffreAffaireMensuelttc / 1.1)
const commissionBrute = computed(() => chiffreAffaireHorsTaxe.value * (salaryInput.value.percentCommissionBrute || 0))
const calculatedAIB = computed(() => commissionBrute.value * 0.05)
const calculatedDebours = computed(() => salaryInput.value.chiffreAffaireMensuelttc * 0.1)
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
function executeCalculation() {
  if (!currentOperator.value) return
  const calculationResult = calculate(salaryInput.value)
  const finalRecord: SalaryCalculation = {
		...calculationResult,
		operatorName: `${currentOperator.value.prenom} ${currentOperator.value.nom}`,
		calculationDate: new Date().toISOString(),
		chiffreAffaireMensuelttc: 0,
		chiffreAffaireFinal: 0,
		chiffreAffaireHorsTaxe: 0,
		percentCommissionBrute: 0,
		fel: 0,
		aib: 0,
		dette: 0,
		penalite: 0,
		remboursement: 0,
		ecart: 0,
		totalPrelevements: 0,
		salaireBrut: 0,
		debours: 0
	}
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
h1 {
    font-weight: 300;
}

.btn {
    background-color: #2f855a;
    border-radius: 3rem;
    padding: 0.75rem;
}

.table-thead {
    background-color: #2f855a;
    color: white;
}
</style>




<!-- <template>
<div>
    <h1 class="mb-6 font-extrabold">Listes des Opérateurs</h1>
    <div class="d-flex align-center justify-end mb-3">
        <button type="button" @click="openNewItemDialog" class="text-white btn hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ajouter un opérateur</button>
    </div>
    <div class="p-6 w-fullshadow-md !rounded-2xl">

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <!-- Thead -->
                <!-- <thead class="table-thead text-xs text-green-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th v-for="header in headers" :key="header.key" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">Actions</th>
                    </tr>
                </thead> -->

                <!-- Tbody -->
                <!-- <tbody>
                    <tr v-for="item in operators" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <!-- Colonnes dynamiques -->
                        <!-- <td v-for="header in headers" :key="header.key" class="px-6 py-4">
                            {{ item[header.key] }}
                        </td> --> -->

                        <!-- Colonne Actions -->
                        <!-- <td class="px-6 py-4 flex space-x-2">
                            <!-- Détails -->
                            <!-- <button class="text-blue-600 hover:text-blue-800" @click="viewItemDetails(item)" title="Détails & Historique">
                                <i class="mdi mdi-eye"></i>
                            </button> -->

                            <!-- Salaire -->
                            <!-- <button class="text-green-600 hover:text-green-800" @click="openSalaryForm(item)" title="Calculer Salaire">
                                <i class="mdi mdi-currency-usd"></i>
                            </button> -->

                            <!-- Modifier -->
                            <!-- <button class="text-yellow-600 hover:text-yellow-800" @click="editItem(item)" title="Modifier">
                                <i class="mdi mdi-pencil"></i>
                            </button> -->

                            <!-- Supprimer -->
                            <!-- <button class="text-red-600 hover:text-red-800" @click="deleteItem(item)" title="Supprimer">
                                <i class="mdi mdi-delete"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->

    <!-- </div> -->

    <!-- Add/Edit Dialog -->
    <!-- <BaseModal v-model="salaryFormDialog" title="Créer un nouvel opérateur" @confirm="saveItem">
        <div class="space-y-2">
            <div class="grid gap-4 mb-4 grid-cols-2"> -->
                <!-- <div class="">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                    <input type="text" name="name" id="name" v-model="editedItem?.prenom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Prénom" required>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                    <input type="text" name="name" id="name" v-model="editedItem.nom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom" required>
                </div>
                <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                    <input type="text" name="name" id="name" v-model="editedItem?.tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom" required>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de machine</label>
                    <input type="text" name="name" id="name" v-model="editedItem?.machineId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom" required>
                </div>
            </div>
        </div>
    </BaseModal> -->

    <!-- Modal toggle -->
    <!-- <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
 
  v-model="salaryFormDialog"
  :title="formTitle"
  max-width="700"
  @cancel="closeEditDialog"
  @confirm="saveItem"
>
  <div>
            <div>
              <div><input v-model="editedItem.prenom" label="Prénom"></div>
              <div><input v-model="editedItem.nom" label="Nom"></div>
              <div><input v-model="editedItem.tel" label="Téléphone"></div>
              <div><input v-model="editedItem.machineId" label="N° Machine"></div>
            </div>
          </div>
</BaseDialog> -->

<!-- Delete Confirmation Dialog -->
<!-- 
		<BaseModal v-model="deleteDialog" title="Confirmation de suppression" @confirm="deleteItemConfirm">
		</BaseModal> -->

<!-- <BaseDialog
  v-model="deleteDialog"
  title=""
  max-width="500"
  @confirm="deleteItemConfirm"
  @cancel="closeDeleteDialog"
>
</BaseDialog> -->

<!-- Salary Form Dialog -->
		<!-- <BaseModal v-model="salaryFormDialog" :title="`Calculer le salaire pour ${currentOperator?.prenom} ${currentOperator?.nom}`" @confirm="confirmAndCalculate">

				<div>
						<div class="col-span-2"><input v-model.number="salaryInput.chiffreAffaireMensuelttc" label="Chiffre d'Affaire Mensuel TTC" type="number" prefix="XOF" required></div>
						<div class="col-span-2"><input :model-value="chiffreAffaireHorsTaxe.toFixed(2)" label="Chiffre d'Affaire Mensuel HT" type="number" prefix="XOF" required></div>
						<div class="col-span-2">
								<input v-model.number="salaryInput.percentCommissionBrute" label="Pourcentage commission brute de l'opérateur" type="number" prefix="XOF" required></input>
						</div> -->
						<!-- <div class="col-span-2">
								<input :model-value="commissionBrute.toFixed(2)" label="Commission Brute" type="number" prefix="XOF" required></input>
						</div>

						<p class="text-subtitle-1 mb-2">Autres Prélèvements (Optionnel)</p>
						<div>
								<div class="col-span-2">
										<input label="FEL" :model-value="2500" readonly type="number" prefix="XOF"></input>
								</div>
								<div class="col-span-2">
										<input label="AIB 5% (calculé)" :model-value="calculatedAIB.toFixed(2)" readonly type="number" prefix="XOF"></input>
								</div>
								<div class="col-span-2">
										<input v-model.number="salaryInput.remboursement" label="Remboursement" type="number" prefix="XOF" clearable></input>
								</div>
								<div class="col-span-2">
										<input v-model.number="salaryInput.ecart" label="Écart" type="number" prefix="XOF" clearable></input>
								</div>
								<div class="col-span-2">
										<input :model-value="calculatedPenalite" label="Pénalité" type="number" prefix="XOF" clearable></input>
								</div>
								<div class="col-span-2">
										<input :model-value="calculatedDebours" label="Débours" type="number" prefix="XOF" clearable></input>
								</div>
						</div>
				</div>

		</BaseModal> -->

<!-- <BaseDialog
  v-model="salaryFormDialog"
  :title="`"
  max-width="700"
  @cancel="closeSalaryFormDialog"
  @confirm="confirmAndCalculate"
>
  <div>
            <div class="mb-4">
              <div><input v-model.number="salaryInput.chiffreAffaireMensuelttc" label="Chiffre d'Affaire Mensuel TTC" type="number" prefix="XOF" required></div>
              <div><input v-model="chiffreAffaireHorsTaxe.toFixed(2)" label="Chiffre d'Affaire Mensuel HT" type="number" prefix="XOF" required></div>
              </div>
               <div class="mb-4">
                <input v-model.number="salaryInput.percentCommissionBrute" label="Pourcentage commission brute de l'opérateur" type="number" prefix="XOF" required></input>
              </div>
               <div class="mb-4">
                <input :model-value="commissionBrute.toFixed(2)" label="Commission Brute" type="number" prefix="XOF" required></input>
              </div>

            </div>
            <p class="text-subtitle-1 mb-2">Autres Prélèvements (Optionnel)</p>
            <div>
             <div class="mb-4">
                <input label="FEL" :model-value="2500" readonly type="number" prefix="XOF"></input>
              </div>
              <div class="mb-4">
                 <input label="AIB 5% (calculé)" :model-value="calculatedAIB.toFixed(2)" readonly type="number" prefix="XOF"></input>
              </div>
              <div class="mb-4">
                <input v-model.number="salaryInput.remboursement" label="Remboursement" type="number" prefix="XOF" clearable></input>
              </div>
              <div class="mb-4">
                <input v-model.number="salaryInput.ecart" label="Écart" type="number" prefix="XOF" clearable></input>
              </div>
              <div class="mb-4">
                <input :model-value="calculatedPenalite" label="Pénalité" type="number" prefix="XOF" clearable></input>
              </div>
              <div class="mb-4">
                <input :model-value="calculatedDebours" label="Débours" type="number" prefix="XOF" clearable></input>
              </div>
            </div>
          </div>
</BaseDialog> -->

<!-- Salary Confirmation Dialog -->
		<!-- <BaseModal v-model="salaryConfirmDialog" title=" Êtes-vous sûr de vouloir valider ces informations ? 
			Cette action enregistrera le calcul de salaire pour ce mois" @confirm="executeCalculation">
		</BaseModal> -->

<!-- </div>
</template> --> -->