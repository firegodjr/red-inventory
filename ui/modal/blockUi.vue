<template>
    <div class="blockui relative">
        <div class="modal-slot red">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.blockui {
    display: grid;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;

    backdrop-filter: blur(10px);
    animation: blockui-fadein 0.1s linear;

    background-color: rgba(0, 14, 12, 0.349);
}

.modal-slot {
    position: relative;
    display: block;
    align-self: center;
    justify-self: center;
    width: 40em;
    background: var(--clr-bg-red);
    backdrop-filter: blur(100px);
    animation: modal-fadein 0.1s linear;
}

@keyframes blockui-fadein {
    0% { 
        backdrop-filter: blur(0); 
        background-color: transparent;
    }
    100% { 
        backdrop-filter: blur(10px); 
        background-color: rgba(0, 14, 12, 0.349);
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