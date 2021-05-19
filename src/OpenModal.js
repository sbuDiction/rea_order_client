export default function openModal(type, isOpen, id) {
    console.log(type);
    console.log(isOpen);
    console.log(id);

    const getType = () => type;

    const getIsOpen = () => isOpen;

    const getId = () => id;
    return {
        getType,
        getIsOpen,
        getId
    }
}