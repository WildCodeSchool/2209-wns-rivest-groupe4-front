import { useRef, useEffect } from "react";

type EventHandler = (event: KeyboardEvent) => void;

const useEventListener = (
  eventName: string,
  handler: EventHandler,
  element: HTMLElement | Window = window,
): void => {
  const savedHandler = useRef<EventHandler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener: EventListener = (event) => {
      if (event instanceof KeyboardEvent) {
        if (savedHandler.current) {
          savedHandler.current(event);
        }
      }
    };

    element.addEventListener(eventName, eventListener);

    // eslint-disable-next-line consistent-return
    return (): void => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
