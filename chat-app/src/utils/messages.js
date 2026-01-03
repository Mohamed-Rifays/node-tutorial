export const generateMessage = (text,username) => {
    return {
        text,
        username,
        createdAt:new Date().getTime()
    }
}

export const generateLocationMessage = (location,username) => {
    return {
        url:location,
        username,
        createdAt:new Date().getTime()
    }
}