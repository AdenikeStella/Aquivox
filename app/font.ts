import localFont from "next/font/local";
import { Licorice, Manrope, Inter, Public_Sans } from "next/font/google";

export const poppins = localFont({
  src: [
    {
      path: "../public/fonts/",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});
export const licorice = Licorice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-licorice",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const public_sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans"
});
