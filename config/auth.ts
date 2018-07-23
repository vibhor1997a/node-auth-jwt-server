import jwt from 'express-jwt';
let auth = jwt({
    secret: '290oasjsdkslskal2e98912kjkaskasl',
    userProperty: 'payload'
});

export { auth };