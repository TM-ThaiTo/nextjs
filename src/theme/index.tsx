"use client";

import React from "react";
import ThemeContextProvider from "./theme.context";
import ComponentWrapper from "./theme.componentWapper";

type Props = {
    user: any | null;
    children: React.ReactNode;
}
export default function ThemeContextProviders({ user, children }: Props) {
    return (
        <ThemeContextProvider user={user}>
            <ComponentWrapper>{children}</ComponentWrapper>
        </ThemeContextProvider>
    );
}
