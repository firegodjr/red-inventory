export enum ModalType {
    NEW_INV = 'modalAddInventory',
    NEW_INV_ITEM = 'modalAddItem',
    NEW_INV_ITEM_ATTR = 'modalAddItemAttrib',
    NEW_ARCH = 'modalAddArchitecture',
    NEW_ARCH_LEVEL = 'modalAddArchLevel',
    NEW_ARCH_ITEM = 'modalAddArchItem',
    CONFIRM = 'modalConfirm'
}

export class ModalRequest {
    public type: ModalType
    public text: string

    constructor(type: ModalType, text: string) {
        this.type = type
        this.text = text
    }
}

export class ModalResult {
    public results: { [key: string ]: any }

    constructor(results: { [key: string ]: any }) {
        this.results = results
    }
}
