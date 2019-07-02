import TinyWorker from 'tiny-worker';

export const rippleWorkerFactory = (): Worker => {
    if (typeof Worker === 'undefined') {
        return new TinyWorker('./build/node/ripple-worker.js');
        // return new TinyWorker(() => {
        //     require('@babel/register')({ cache: true });
        //     require('../../../lib/workers/ripple/index.js');
        // });
    }
    return new Worker('./build/web/ripple-worker.js');
};

export const blockbookWorkerFactory = (): Worker => {
    if (typeof Worker === 'undefined') {
        return new TinyWorker('./build/node/blockbook-worker.js');
        // return new TinyWorker(() => {
        //     require('@babel/register')({ cache: true });
        //     require('../../../lib/workers/blockbook/index.js');
        // });
    }
    return new Worker('./build/web/blockbook-worker.js');
};
