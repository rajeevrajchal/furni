import { getContext, setContext } from "svelte";

export class CounterStore {
    public count = $state<number>(0);

    public increase = () => {
        this.count++
    }

    public decrease = () => {
        if (this.count === 0) return;
        this.count--
    }

}

export const counter = new CounterStore()

export const COUNTER_CONTEXT_KEY = Symbol('counter');


export function setCounterState() {
    return setContext(COUNTER_CONTEXT_KEY, new CounterStore());
}

export function getCounterState() {
    return getContext<ReturnType<typeof setCounterState>>(COUNTER_CONTEXT_KEY);
}