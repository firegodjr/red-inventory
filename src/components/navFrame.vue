<template>
    <div class="wrapper red">
        <template v-if="accountStore.account">
            <div class="nav noselect">
                <div class="buttons">
                    <div
                        id="invs"
                        @click="
                            () => {
                                SetState(NavState.Inventories);
                                $router.push('/inventories');
                            }
                        "
                    >
                        <i class="fa-solid fa-layer-group fa-sm"></i><span> Inventories</span>
                    </div>
                    <div
                        id="arch"
                        @click="
                            () => {
                                SetState(NavState.Architectures);
                                $router.push('/architectures');
                            }
                        "
                    >
                        <i class="fa-solid fa-code fa-sm"></i><span> Architectures</span>
                    </div>
                    <div
                        id="crew"
                        @click="
                            () => {
                                SetState(NavState.Crews);
                                $router.push('/crews');
                            }
                        "
                    >
                        <i class="fa-solid fa-handshake fa-sm"></i><span> Crews</span>
                    </div>
                    <div
                        id="acct"
                        @click="
                            () => {
                                SetState(NavState.Account);
                                $router.push('/account');
                            }
                        "
                    >
                        <i class="fa-solid fa-user-large fa-sm"></i><span> Account</span>
                    </div>
                </div>
            </div>
            <div class="line red-box"></div>
        </template>
        <!-- <div class="content-frame red">
            <slot name="invs" v-if="Selected == NavState.Inventories"></slot>
            <slot name="arch" v-if="Selected == NavState.Architectures"></slot>
            <slot name="crew" v-if="Selected == NavState.Crews"></slot>
            <slot name="acct" v-if="Selected == NavState.Account"></slot>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();

enum NavState {
    Inventories = 'invs',
    Architectures = 'arch',
    Account = 'acct',
    Crews = 'crew'
}

let Selected: Ref<NavState> = ref(NavState.Inventories);

function SetState(state: NavState): void {
    console.log('Setting State');

    let oldEl = document.getElementById(Selected.value);
    oldEl?.classList.remove('selected');
    oldEl?.classList.remove('blue');
    Selected.value = state;
    let el = document.getElementById(state);
    el?.classList.add('selected');
    el?.classList.add('blue');
}

onMounted(() => {
    SetState(NavState.Inventories);
});
</script>

<style>
.wrapper {
    padding: 0 1em;
    container-name: 'wrapper';
}

.buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-weight: bold;
    margin: auto;
    max-width: 50em;
    height: 3.4em;
}

.buttons > div {
    text-align: center;

    padding: 0.5em;
    font-size: 1.4em;

    cursor: pointer;
}

.buttons > div.selected {
    animation: select-flash 0.25s linear;
}

.buttons > div:hover {
    background-color: var(--clr-bg-red);
}

.buttons > div.selected:hover {
    background-color: transparent;
}

.nav {
    container-type: inline-size;
    container-name: nav-top;
}

@keyframes select-flash {
    0% {
        background-color: var(--clr-bg-red-active);
    }
    100% {
        background-color: transparent;
    }
}

@container nav-top (max-width: 550px) {
    .buttons {
        font-size: 0.75rem;
    }
}

@container nav-top (max-width: 695px) {
    .buttons span {
        display: none;
        font-size: 1rem;
    }

    .buttons {
        font-size: 1.25rem;
    }
}
</style>
import { type Ref, ref, onMounted } from 'vue';onMounted, , type Ref
