'use client'
import { useRef, useState } from 'react'

interface OTPInputProps {
    length?: number
    onChange?: (val: string) => void  // 👈 add this
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    const updateOtp = (newOtp: string[]) => {
        setOtp(newOtp)
        onChange?.(newOtp.join(''))  // 👈 call onChange with the full OTP string
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/, '')
        if (!value) return

        const newOtp = [...otp]
        newOtp[index] = value
        updateOtp(newOtp)  // 👈 use updateOtp instead of setOtp

        if (index < length - 1) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp]
            newOtp[index] = ''
            updateOtp(newOtp)  // 👈 use updateOtp instead of setOtp

            if (index > 0) {
                inputs.current[index - 1]?.focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text').slice(0, length)
        const newOtp = [...paste.split(''), ...Array(length - paste.length).fill('')]
        updateOtp(newOtp)  // 👈 use updateOtp instead of setOtp
        inputs.current[Math.min(paste.length, length - 1)]?.focus()
        e.preventDefault()
    }

    return (
        <div className="flex gap-2">
            {otp.map((digit, index) => (
                <input
                id={`otp-${index}`}    
        name={`otp-${index}`} 
                    key={index}
                    ref={(el: HTMLInputElement | null) => { inputs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="md:w-14 md:h-14 w-10 h-10 text-center text-xl border border-[#6B7280] rounded-lg focus:outline-none focus:border-teal-400"
                />
            ))}
        </div>
    )
}