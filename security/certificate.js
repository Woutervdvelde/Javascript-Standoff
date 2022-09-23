const selfsigned = require('selfsigned');


const generateCert = () => {
    const attrs = [{ name: 'Javascript-Shootout', value: 'js.com' }];
    const pems = selfsigned.generate(attrs, { days: 365 });
};

module.exports = {
    generateCert: generateCert
}