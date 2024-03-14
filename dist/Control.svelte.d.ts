import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ControlProps = typeof __propDef.props;
export type ControlEvents = typeof __propDef.events;
export type ControlSlots = typeof __propDef.slots;
export default class Control extends SvelteComponent<ControlProps, ControlEvents, ControlSlots> {
}
export {};
