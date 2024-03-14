import { SvelteComponent } from "svelte";
import { type AnySourceImpl } from 'mapbox-gl';
declare const __propDef: {
    props: {
        name: string;
        type: "geojson" | "video" | "image" | "canvas" | "vector" | "raster" | "raster-dem" | "custom";
        data: AnySourceImpl;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SourceProps = typeof __propDef.props;
export type SourceEvents = typeof __propDef.events;
export type SourceSlots = typeof __propDef.slots;
export default class Source extends SvelteComponent<SourceProps, SourceEvents, SourceSlots> {
}
export {};
