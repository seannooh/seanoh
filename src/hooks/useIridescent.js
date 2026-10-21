import { useEffect } from "react";
import { registerIridescent } from "../lib/iridescence.js";

// Lets an element's iridescence (see styles/iridescence.css) follow the cursor and scroll.
export default function useIridescent(ref) {
    useEffect(() => registerIridescent(ref.current), [ref]);
}
