const status = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    SUCCEDED: "SUCCEDED",
    FAILED: "FAILED",
};
Object.freeze(status);
Object.preventExtensions(status);

export default status;
