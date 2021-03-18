export const home = (req, res) => res.render('home', {page_title : 'Home'});
export const search = (req, res) => {
    // 최신 방법
    const { 
        query: {term:searching_by} 
    } = req;
    // 옛날 방법
    // const searching_by = req.query.term;
    
    res.render('search', {page_title : 'Search', searching_by});
}
export const upload = (req, res) => res.send('upload', {page_title : 'Upload'});
export const video_detail = (req, res) => res.send('video_detail', {page_title : 'Video Detail'});
export const edit_video = (req, res) => res.send('edit_video', {page_title : 'Edit Video'});
export const delete_video = (req, res) => res.send('delete_video', {page_title : 'Delete Video'});
