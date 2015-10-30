export function promisify(fn){
    return function(...args){
        return new Promise((resolve, reject) => {
            fn.call(this, ...args, (err, result) => {
                if(err){
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
}
