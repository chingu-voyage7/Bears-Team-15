export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, data, page = null) => {
    return {
        type: OPEN_MODAL,
        payload: {
            modal,
            data,
            page,
        },
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    };
};
