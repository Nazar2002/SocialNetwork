export type usersType ={
    id: number
    followed?: boolean | null | undefined
    name: string
    status: string
    photos: photosType
}
export type contactsType= {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType= {
    small: string | null
    large: string | null
}
export type profileType= {
    userId?: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe:string
    fullName: string
    contacts: contactsType
    photos: photosType
}
export type postDataType= {
    id: number
    message: string
}
export type dialogsMessageType ={
    id: number
    name?: string
    src?: string
    message?: string
}