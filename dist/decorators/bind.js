export function Bind(_, __, propertyDescriptor) {
    return {
        configurable: true,
        get() {
            return propertyDescriptor.value.bind(this);
        }
    };
}
//# sourceMappingURL=bind.js.map