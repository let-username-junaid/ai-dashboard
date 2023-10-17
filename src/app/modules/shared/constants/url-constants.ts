import {environment} from "../../../../environments/environment"

export const UrlConstants={
    uploads:environment.serverUrl+"/uploads",
    upload:environment.serverUrl+"/upload",
    deleteById:(id:string)=>environment.serverUrl+"/upload/"+id,
    chat:environment.serverUrl+"/chat"
}