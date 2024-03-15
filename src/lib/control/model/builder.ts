import mapboxgl from "mapbox-gl";

class Builder {

    private component: HTMLElement | null;

    constructor(private readonly elementID: string) {this.component = null}

    onAdd(map:mapboxgl.Map): HTMLElement {
        this.component = document.getElementById(this.elementID);
        if(this.component === null) {
            throw new Error('Component not found');
        }
        return this.component;
    }

    onRemove() {
        this.component?.parentNode?.removeChild(this.component);
    }

}

export default Builder;