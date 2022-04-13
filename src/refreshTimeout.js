export default (cb) => {
    let timeout = null;
    const stop = () => {
        if (timeout) clearTimeout(timeout);
    };
    const start = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb();
            start();
        }, 5000);
    };
    return { start, stop };
};