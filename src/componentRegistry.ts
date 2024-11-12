import React from "react";
import { MatchMatchLanding } from "./components/Apps/MatchMatch/MatchMatchLanding";

export const componentRegistry: ComponentRegister[] = [
    {
        ComponentUrl: "match-match",
        ComponentTitle: "Match-Match",
        Component: MatchMatchLanding
    }
]

export interface ComponentRegister {
    ComponentUrl: string,
    ComponentTitle: string,
    Component: React.FC
}