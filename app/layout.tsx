// import type { Metadata } from "next";
// import {
//   Plus_Jakarta_Sans,
//   Space_Grotesk,
//   Cormorant_Garamond,
// } from "next/font/google";
// import "./globals.css";

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-plus-jakarta",
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-space-grotesk",
//   weight: ["400", "500", "600", "700"],
// });

// const cormorant = Cormorant_Garamond({
//   subsets: ["latin"],
//   variable: "--font-editorial",
//   weight: ["500", "600", "700"],
//   style: ["normal", "italic"],
// });

// export const metadata: Metadata = {
//   title: "Developer Portfolio",
//   description: "Premium developer portfolio website",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Cormorant_Garamond,
} from "next/font/google";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import BackgroundMusic from "@/components/BackgroundMusic/BackgroundMusic";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Premium developer portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
      >
        <CustomCursor />
        <BackgroundMusic />
        <div id="noise-overlay" />

        {children}
      </body>
    </html>
  );
}