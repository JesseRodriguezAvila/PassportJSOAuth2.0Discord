type Response = {
    success: boolean;
    status_code: number;
    status_message: string;
}

export type SuccessResponse = Response & {
    data?: any
}

export type FailedResponse = Response & {
    stack?: string;
}