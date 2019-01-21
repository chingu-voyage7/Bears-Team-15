export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, data) => {
    console.log("fromModal",data);
    return {
        type: OPEN_MODAL,
        payload: {
            modal,
            data,
        },
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    };
};
