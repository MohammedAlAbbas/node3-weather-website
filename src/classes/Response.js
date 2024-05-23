export default class Response {
    constructor(success, results, message) {
        this.success = success;
        this.results = results;
        this.message = message;
    }



    getResponse() {
        return {
            success: this.success,
            results: this.results,
            message: this.message
        }
    }
}
