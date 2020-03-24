export interface Validate {
    value: string;
    minLength?: number;
    maxLength?: number;
}

export function validator(input: Validate ): boolean {
    let isValid = true;

    if(!input.value.trim()) {
        isValid = false;
    }
    if(input.minLength != null) {
        isValid = isValid && input.value.trim().length >= input.minLength;
    }

    if(input.maxLength != null) {
        isValid = isValid && input.value.trim().length <= input.maxLength;
    }
    return isValid;
}