import { api } from "@/utils/api"

const getOneHidden = async () => {
    const url = `/hidden-words`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    })
    return { data, error };
}

const putUpdateHidden = async (dataU: any) => {
    const url = `/hidden-words`;
    const { data, error } = await api<any>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataU),
    })
    return { data, error };
}

const putUpdateCusstomHidden = async (dto: any) => {
    const url = `/hidden-words/custom-hidden`;
    const { data, error } = await api<any>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    })
    return { data, error };
}

export {
    getOneHidden,
    putUpdateHidden,
    putUpdateCusstomHidden
}