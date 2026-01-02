export const generateMessage = (text) => {
    return {
        text,
        createdAt:new Date().getTime()
    }
}

export const generateLocationMessage = (location) => {
    return {
        url:location,
        createdAt:new Date().getTime()
    }
}