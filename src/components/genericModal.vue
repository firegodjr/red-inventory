<template>
    <div class="blockui relative">
        <component :is="props.modal" v-if="modal !== null" 
        @submit="(e:any) => emit('submit', e)" 
        @cancel="(e:any) => emit('cancel', e)"
        />
        <template v-else>
            <!-- fallback modal -->
            <div class="modal red">
                <div class="red-box line"></div>
                <div class="modal-content">
                    <img src="../images/attention.png" width="100" style="margin: auto"/>
                    <h1 style="text-align: center">You are lost in the NET.</h1>
                    <br />
                    <button @click="() => emit('cancel')">Get me outta here!</button>
                </div>
                <div class="red-box line"></div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ModalType } from './modal';
import AddInvModal from './modal/addInvModal.vue';


const props = defineProps<{
    modal: object | null
    type: ModalType
}>();

const emit = defineEmits([
    "submit",
    "cancel"
]);

let show = ref(false);
</script>

<style>
.blockui {
    display: grid;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;

    backdrop-filter: blur(10px);
    animation: blockui-fadein 0.1s linear;

    background-color: rgba(0, 0, 0, 0.349);
}

.modal {
    position: relative;
    display: block;
    align-self: center;
    justify-self: center;
    width: 40em;
    background: var(--clr-bg-red);
    backdrop-filter: blur(100px);
    animation: modal-fadein 0.1s linear;

}

.modal-line-box > i {
    position: absolute;
    left: -1.50em;
    top: 0.50em;
}

.modal-content {
    padding: 1em;
}

@keyframes blockui-fadein {
    0% { 
        backdrop-filter: blur(0); 
        background-color: transparent;
    }
    100% { 
        backdrop-filter: blur(10px); 
        background-color: rgba(0, 0, 0, 0.349);
    }
}

@keyframes modal-fadein {
    0% {
        transform: rotateX(90deg);
    }
    100% {
        transform: rotateX(0deg);
    }
}
</style>