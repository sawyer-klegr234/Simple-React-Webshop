import { Inputs, useEffect } from "preact/hooks";

export const useAsyncEffect = (effect: AsyncEffectCallback, inputs?: Inputs) => {   
    useEffect(() => {
        let cancelled = false;
        const checkCancelled = () => cancelled;

        (async () => {
            try {
                await effect(checkCancelled);
            }
            catch (e) {
                console.warn("An error occurred:", e)
            }
        })();

        return () => {
            cancelled = true;
        };
    }, inputs);
};

type AsyncEffectCallback = (checkCancelled: () => boolean) => Promise<void>;