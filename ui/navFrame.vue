<template>
    <div class="wrapper red">
        <div class="nav noselect">
            <div class="buttons">
                <div id="invs" @click="() => SetState(NavState.Inventories)">
                    <i class="fa-solid fa-layer-group fa-sm"></i><span> Inventories</span>
                </div>
                <div id="arch" @click="() => SetState(NavState.Architectures)">
                    <i class="fa-solid fa-code fa-sm"></i><span> Architectures</span>
                </div>
                <div id="acct" @click="() => SetState(NavState.Account)">
                    <i class="fa-solid fa-user-large fa-sm"></i><span> Account</span>
                </div>
            </div>
        </div>
        <div class="line red-box"></div>
        <div class="content-frame red">
            <slot name="invs" v-if="Selected == NavState.Inventories"></slot>
            <slot name="arch" v-if="Selected == NavState.Architectures"></slot>
            <slot name="acct" v-if="Selected == NavState.Account"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
enum NavState {
    Inventories = "invs",
    Architectures = "arch",
    Account = "acct"
}

let Selected: Ref<NavState> = ref(NavState.Inventories);

function SetState(state: NavState): void {
    console.log("Setting State");
    
    let oldEl = document.getElementById(Selected.value);
    oldEl?.classList.remove("selected");
    oldEl?.classList.remove("blue");
    Selected.value = state;
    let el = document.getElementById(state);
    el?.classList.add("selected");
    el?.classList.add("blue");
}

onMounted(() => {
    SetState(NavState.Inventories);
})
</script>

<style>
.wrapper {
    padding: 0 1em;
}

.buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

.content-frame {
    padding: 1em;
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

@container nav-top (max-width: 400px) {
    .buttons span {
        display: none;
    }
}
</style>