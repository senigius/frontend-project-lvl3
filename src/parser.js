export default (data) => {
    return new DOMParser().parseFromString(data, "text/html");
};