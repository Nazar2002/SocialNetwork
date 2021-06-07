import { profileType, photosType} from './../types/types'
import { instance,ResponseType,ResultCode } from './Api'
type ResponseDataType<Data> = {
    data:Data
    resultCode: ResultCode
    messages: Array<string>
}
type savePhotoType = {
    photos:photosType
} 
export const profileAPI = {
    profileUser(userId: number){
        return instance.get<profileType>(`profile/${userId}`)
            .then(response =>{return response.data})
    },
    savePhoto(photoFile: string){
        const formData = new FormData()
        formData.append("image",photoFile)
        return instance.put<ResponseDataType<savePhotoType>>(`profile/photo`,formData)
            .then(response => {return response.data})
    },
    saveProfileData(profile: profileType){
        return instance.put<ResponseType>(`profile`,profile)
            .then(response => {return response.data})
    },
    getStatus(userId: number){
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => {return response.data})
    },
    updateStatus(status: string){
        return instance.put<ResponseType>(`profile/status`,{status: status})
            .then(response => {return response.data})
    }
}