import routes from '../routes'


export const get_join = (req, res) => res.render('join', {page_name:"Join"});
export const post_join = (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req

    if(password !== password2) {
        // 구글의 비밀 번호 저장을 막기 위함
        res.status(400);
        res.render('join', {page_name:"Join"});
    } else {
        // To Do : Register User
        // To Do : Log User In
        res.redirect(routes.home);
    }

}

export const login = (req, res) => {res.render('login', {page_name:"Login"});};
export const logout = (req, res) => {
    // To Do : Process Log Out
    res.redirect(routes.home);
}
export const edit_profile = (req, res) => res.render("edit_profile");
export const change_password = (req, res) => res.render("change_password");