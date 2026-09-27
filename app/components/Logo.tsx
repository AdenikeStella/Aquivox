import Image from "next/image"

interface LogoProps {
    size?: number;
    className?: string;
}

export const Logo = ({size = 56, className}: LogoProps) => {
    return (
        <Image
        src= "/Main_Logo.svg" 
        alt="main_logo"
        width={size}
        height={size}
        className={className}
        />
    );
};