import routes from './routes'

export const locals_middleware = (req, res, next) => {
    res.locals.site_name = 'WeTube';
    res.locals.routes = routes;
    res.locals.user = {
        is_authenticated: true,
        id: "xbox1720"
    }
    next();
}