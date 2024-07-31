import React from "react";
import { Image } from "@nextui-org/react";

export default function LogoImage() {
    return (
        <Image
            width={80}
            src="/logo.svg"
            alt="NextUI Album Cover"
            className="m-5"
        />
    );
}
