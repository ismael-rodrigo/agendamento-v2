export interface HttpResponse {
    statusCode: number
    body: any
  }
  
  export interface HttpRequest {
    consumer_id?: any
    body?: any
    params?: any
    query?: any
  }