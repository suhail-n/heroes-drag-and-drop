export function validator(input) {
    let isValid = true;
    if (!input.value.trim()) {
        isValid = false;
    }
    if (input.minLength != null) {
        isValid = isValid && input.value.trim().length >= input.minLength;
    }
    if (input.maxLength != null) {
        isValid = isValid && input.value.trim().length <= input.maxLength;
    }
    return isValid;
}
//# sourceMappingURL=validate.js.map