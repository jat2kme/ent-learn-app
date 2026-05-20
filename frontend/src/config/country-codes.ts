export interface CountryCode {
    name: string;
    code: string;
    dialCode: string;
}

export const COUNTRY_CODES: CountryCode[] = [
    { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
    { name: 'United States', code: 'US', dialCode: '+1' },
    { name: 'Canada', code: 'CA', dialCode: '+1' },
    { name: 'Australia', code: 'AU', dialCode: '+61' },
    { name: 'India', code: 'IN', dialCode: '+91' },
    { name: 'Nigeria', code: 'NG', dialCode: '+234' },
    { name: 'Kenya', code: 'KE', dialCode: '+254' },
    { name: 'Ghana', code: 'GH', dialCode: '+233' },
    { name: 'South Africa', code: 'ZA', dialCode: '+27' },
    { name: 'New Zealand', code: 'NZ', dialCode: '+64' },
    { name: 'Ireland', code: 'IE', dialCode: '+353' },
    { name: 'Germany', code: 'DE', dialCode: '+49' },
    { name: 'France', code: 'FR', dialCode: '+33' },
    { name: 'Italy', code: 'IT', dialCode: '+39' },
    { name: 'Spain', code: 'ES', dialCode: '+34' },
    { name: 'Netherlands', code: 'NL', dialCode: '+31' },
    { name: 'Brazil', code: 'BR', dialCode: '+55' },
    { name: 'Mexico', code: 'MX', dialCode: '+52' },
    { name: 'Singapore', code: 'SG', dialCode: '+65' },
    { name: 'United Arab Emirates', code: 'AE', dialCode: '+971' },
];

export function getDialCodeByCountryName(name: string): string | null {
    if (!name) return null;
    const searchName = name.toLowerCase();

    if (searchName === 'uk') return '+44';
    if (searchName === 'usa') return '+1';

    const country = COUNTRY_CODES.find(
        (c) => c.name.toLowerCase() === searchName || c.code.toLowerCase() === searchName
    );
    return country ? country.dialCode : null;
}

export function splitPhoneNumber(fullNumber: string): { dialCode: string; number: string } {
    if (!fullNumber) return { dialCode: '', number: '' };

    const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.dialCode.length - a.dialCode.length);

    for (const country of sortedCodes) {
        if (fullNumber.startsWith(country.dialCode)) {
            return {
                dialCode: country.dialCode,
                number: fullNumber.slice(country.dialCode.length).trim()
            };
        }
    }

    if (fullNumber.startsWith('+')) {
        const spaceIndex = fullNumber.indexOf(' ');
        if (spaceIndex !== -1) {
            return {
                dialCode: fullNumber.slice(0, spaceIndex),
                number: fullNumber.slice(spaceIndex + 1).trim()
            };
        }
    }

    return { dialCode: '', number: fullNumber };
}

export function getCountryByDialCode(dialCode: string): CountryCode | undefined {
    return COUNTRY_CODES.find(c => c.dialCode === dialCode);
}

export interface AddressLabels {
    stateLabel: string;
    zipLabel: string;
    cityLabel: string;
    examples: {
        state: string;
        zip: string;
        city: string;
    }
}

export function getAddressLabels(countryCode?: string): AddressLabels {
    if (!countryCode) {
        return {
            stateLabel: 'State/Province',
            zipLabel: 'Postal/ZIP Code',
            cityLabel: 'City',
            examples: {
                state: 'State/Province',
                zip: 'Postal Code',
                city: 'City'
            }
        };
    }

    const code = countryCode.toUpperCase();

    if (code === 'GB' || code === 'UK') {
        return {
            stateLabel: 'County',
            zipLabel: 'Postcode',
            cityLabel: 'Town/City',
            examples: {
                state: 'e.g. London',
                zip: 'SW1A 1AA',
                city: 'Westminster'
            }
        };
    }

    if (code === 'US') {
        return {
            stateLabel: 'State',
            zipLabel: 'ZIP Code',
            cityLabel: 'City',
            examples: {
                state: 'CA',
                zip: '90210',
                city: 'Los Angeles'
            }
        };
    }

    if (code === 'CA') {
        return {
            stateLabel: 'Province',
            zipLabel: 'Postal Code',
            cityLabel: 'City',
            examples: {
                state: 'ON',
                zip: 'M5V 2T6',
                city: 'Toronto'
            }
        };
    }

    if (code === 'AU') {
        return {
            stateLabel: 'State',
            zipLabel: 'Postcode',
            cityLabel: 'City',
            examples: {
                state: 'NSW',
                zip: '2000',
                city: 'Sydney'
            }
        };
    }

    if (code === 'IN') {
        return {
            stateLabel: 'State',
            zipLabel: 'PIN Code',
            cityLabel: 'City',
            examples: {
                state: 'Maharashtra',
                zip: '400001',
                city: 'Mumbai'
            }
        };
    }

    return {
        stateLabel: 'State/Province',
        zipLabel: 'Postal Code',
        cityLabel: 'City',
        examples: {
            state: 'State/Province',
            zip: 'Postal Code',
            city: 'City'
        }
    };
}
