"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Phone, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { COUNTRY_CODES, splitPhoneNumber, getCountryByDialCode } from "@/config/country-codes";
import { AsYouType, CountryCode as LibCountryCode } from 'libphonenumber-js';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    className?: string;
    error?: string;
}

export function PhoneInput({
    value,
    onChange,
    placeholder = "Phone number",
    id,
    disabled = false,
    className,
    error
}: PhoneInputProps) {
    const [open, setOpen] = React.useState(false);

    const { dialCode: initialDialCode, number: initialNumber } = React.useMemo(() => {
        return splitPhoneNumber(value);
    }, [value]);

    const [selectedDialCode, setSelectedDialCode] = React.useState(initialDialCode || "+44");
    const [phoneNumber, setPhoneNumber] = React.useState(initialNumber);
    const [isValid, setIsValid] = React.useState(true);

    const getCountryCodeIso = (dialCode: string): LibCountryCode | undefined => {
        const country = getCountryByDialCode(dialCode);
        return country ? (country.code as LibCountryCode) : undefined;
    };

    React.useEffect(() => {
        const { dialCode, number } = splitPhoneNumber(value);

        if (dialCode && dialCode !== selectedDialCode) {
            setSelectedDialCode(dialCode);
        }

        const currentFull = selectedDialCode + phoneNumber;
        const normalizedCurrent = currentFull.replace(/\s/g, '');
        const normalizedExternal = (value || '').replace(/\s/g, '');

        if (normalizedExternal !== normalizedCurrent && normalizedExternal !== '') {
            setPhoneNumber(number);
        }

        if (value) {
            try {
                const countryCode = getCountryCodeIso(dialCode || selectedDialCode);
                const asYouType = new AsYouType(countryCode);
                asYouType.input(dialCode + number);
                setIsValid(asYouType.isValid());
            } catch (e) {
                setIsValid(false);
            }
        } else {
            setIsValid(true);
        }

    }, [value, selectedDialCode]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const countryCode = getCountryCodeIso(selectedDialCode);

        const fullNumber = selectedDialCode + inputVal;
        const asYouType = new AsYouType(countryCode);
        asYouType.input(fullNumber);
        const valid = asYouType.isValid();

        setIsValid(valid);
        setPhoneNumber(inputVal);
        onChange(`${selectedDialCode}${inputVal}`);
    };

    const handleDialCodeSelect = (dialCode: string) => {
        setSelectedDialCode(dialCode);
        onChange(`${dialCode}${phoneNumber}`);
        setOpen(false);
    };

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <div className="flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100px] px-2 bg-background"
                            disabled={disabled}
                        >
                            {selectedDialCode || "+44"}
                            <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 z-[10001]">
                        <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup className="max-h-[300px] overflow-auto">
                                    {COUNTRY_CODES.map((country) => (
                                        <CommandItem
                                            key={`${country.code}-${country.dialCode}`}
                                            value={country.name}
                                            onSelect={() => handleDialCodeSelect(country.dialCode)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedDialCode === country.dialCode ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="flex-1 truncate">{country.name}</span>
                                            <span className="text-muted-foreground ml-1">{country.dialCode}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="relative flex-1">
                    <Input
                        id={id}
                        type="tel"
                        placeholder={placeholder}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={disabled}
                        className={cn(
                            "bg-background pl-8",
                            !isValid && value ? "border-red-500 focus-visible:ring-red-500" : "",
                            error ? "border-red-500 focus-visible:ring-red-500" : ""
                        )}
                    />
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    {!isValid && value && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                </div>
            </div>
            {(!isValid && value) && (
                <p className="text-xs text-red-500 ml-1">Invalid phone number for selected country</p>
            )}
        </div>
    );
}
