import { SvelteComponent } from "svelte";
import mapboxgl from "mapbox-gl";
declare const __propDef: {
    props: {
        type: "symbol" | "line" | "background" | "circle" | "fill-extrusion" | "fill" | "heatmap" | "hillshade" | "raster" | "custom" | "sky";
        paint?: mapboxgl.AnyPaint | undefined;
        layout?: mapboxgl.AnyLayout | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LayerProps = typeof __propDef.props;
export type LayerEvents = typeof __propDef.events;
export type LayerSlots = typeof __propDef.slots;
export default class Layer extends SvelteComponent<LayerProps, LayerEvents, LayerSlots> {
}
export {};
