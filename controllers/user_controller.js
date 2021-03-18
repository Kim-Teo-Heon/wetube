export const join = (req, res) => res.render('join', {page_name:"Join"});
export const login = (req, res) => {res.render('login', {page_name:"Login"});};
export const logout = (req, res) => res.send('logout');