const DEV_ENV = "https://b6skvn9l7h.execute-api.ap-south-1.amazonaws.com/Dev/";

const Endpoints = {
    UPDATE_ADDRESS : DEV_ENV + "kycorganization",
    GET_CUSTOMER : DEV_ENV + "kyc/userininstitutionkyc",
    GET_UserId : DEV_ENV + "get_KycUserId",
    GET_PRESIGNED_LINK : DEV_ENV + "upload-bond-files",
    UPLOAD_KYC_DETAIL : DEV_ENV + "kycqldbusercreation"
}

export default Endpoints;