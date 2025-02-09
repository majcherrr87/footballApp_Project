const API_KEY = import.meta.env.VITE_API_KEY

export const useApi = () => {
    const call = async <R, P = {}>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        body?: P,
    ) => {
        const commonData = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const requestData = body
            ? { ...commonData, body: JSON.stringify(body) }
            : commonData

        try {
            const response = await fetch(`${API_KEY}${url}`, requestData)

            if (response.ok) {
                const data: R = await response.json()
                return data
            } else {
                const apiError = await response.text()
                throw new Error(apiError)
            }
        } catch (error) {
            console.error(error)

            throw new Error('Something went wrong: ' + error)
        }
    }

    const apiGet = async <R,>(url: string) => {
        return await call<R>(url, 'GET')
    }

    const apiPost = async <R, P>(url: string, body: P) => {
        return await call<R, P>(url, 'POST', body)
    }

    const apiDelete = async <R,>(url: string): Promise<R | undefined> => {
        return await call<R>(url, 'DELETE')
    }

    const apiPut = async <R, P>(
        url: string,
        body: P,
    ): Promise<R | undefined> => {
        return await call<R, P>(url, 'PUT', body)
    }

    const apiPatch = async <R, P>(
        url: string,
        body: P,
    ): Promise<R | undefined> => {
        return await call<R, P>(url, 'PATCH', body)
    }
    return {
        apiPost,
        apiGet,
        apiDelete,
        apiPut,
        apiPatch,
    }
}
