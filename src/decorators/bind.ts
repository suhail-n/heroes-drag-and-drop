export function Bind(_: any, __: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
    return {
        configurable: true,
        get() {
            // the value refers to the function this decorator is attached to.
            // bind to 'this' which refers to the class holding the function. (default functionality of property descriptors)
            return propertyDescriptor.value.bind(this)
        }
    }
}