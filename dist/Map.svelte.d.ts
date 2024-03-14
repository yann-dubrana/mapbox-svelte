import { SvelteComponent } from "svelte";
import mapboxgl from 'mapbox-gl';
declare const __propDef: {
    props: {
        [x: string]: any;
        token: string;
        configuration: mapboxgl.MapboxOptions;
        map?: mapboxgl.Map | undefined;
    };
    events: {
        zoomend: CustomEvent<any>;
        mousemove: CustomEvent<any>;
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type MapProps = typeof __propDef.props;
export type MapEvents = typeof __propDef.events;
export type MapSlots = typeof __propDef.slots;
export default class Map extends SvelteComponent<MapProps, MapEvents, MapSlots> {
}
export {};
