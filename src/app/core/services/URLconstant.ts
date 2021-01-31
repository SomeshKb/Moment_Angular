import { environment } from "src/environments/environment";

export class URLConstant{

    apiURL = environment.apiUrl + '/';
    public applicationApiUrl: Object = {};
    public logApiUrl: Object = {};
    /**
     * Api urls for new common-http service
     */
    constructor() {
        this.applicationApiUrl['LOGIN'] = this.apiURL + 'auth/login';
        this.applicationApiUrl['GET_MOMENTS'] = this.apiURL + 'moment';
        this.applicationApiUrl['CREATE_MOMENTS'] = this.apiURL + 'moment/create';
        this.applicationApiUrl['UPDATE_MOMENTS'] = this.apiURL + 'moment/update/{id}';
        this.applicationApiUrl['GET_SINGLE_MOMENTS'] = this.apiURL + 'moment/{id}';
        this.applicationApiUrl['DELETE_MOMENTS'] = this.apiURL + 'moment/{id}';


    }


    getApiUrl(urlKey, dynamicUrlValues?: any) {
        let apiUrl = urlKey;
        if (urlKey.indexOf("http://") === -1 && urlKey.indexOf("https://") === -1) {

            apiUrl = this.applicationApiUrl[urlKey] ? this.applicationApiUrl[urlKey] : this.apiURL + urlKey;
        }
        if (dynamicUrlValues) {
            Object.keys(dynamicUrlValues).forEach(key => {
                apiUrl = apiUrl.replace(`{${key}}`, dynamicUrlValues[key]);
            });
        }
        apiUrl.replace()
        return apiUrl;
    }


}