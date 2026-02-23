import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JININ - 隠れ地雷度診断",
};

export default function JiraiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
